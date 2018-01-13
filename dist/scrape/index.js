'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getAllTeamOwners = require('./scrapi/getAllTeamOwners');

var _mongoconnector = require('../backend/mongoconnector');

var _mongoconnector2 = _interopRequireDefault(_mongoconnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios');
var cheerio = require('cheerio');
var moment = require('moment');


var seasonMap = {};

var firstYear = 2014;

var currentActiveYear = moment().month() >= 10 ? moment().year() : moment().subtract(1, 'years').year();

for (var i = firstYear; i <= currentActiveYear; i++) {
    seasonMap[i] = [];
}

var scrapeForOwners = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var mongo, owners, cursor, newArr;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return (0, _mongoconnector2.default)();

                    case 2:
                        mongo = _context.sent;
                        owners = mongo.Owners;
                        cursor = owners.find({});
                        newArr = Promise.all(Object.keys(seasonMap).map(function (key) {
                            var url = 'http://fantasy.nfl.com/league/2273376/history/' + key + '/owners';
                            return axios.get(url).then(function (response) {
                                seasonMap[key] = (0, _getAllTeamOwners.getOwnersForCurrentSeason)(response, key);
                            });
                        }));


                        newArr.then(function () {
                            owners.insertMany((0, _getAllTeamOwners.mapAllTeamOwnersToTeamNames)(seasonMap)).then(function () {
                                mongo.database.close();
                            });
                        });

                    case 7:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function scrapeForOwners() {
        return _ref.apply(this, arguments);
    };
}();

scrapeForOwners();