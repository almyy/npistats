'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MongoClient = require('mongodb').MongoClient;
var MONGO_URL = 'mongodb://localhost:27017';

var connect = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var database, db;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return MongoClient.connect(MONGO_URL);

                    case 2:
                        database = _context.sent;
                        db = database.db("npi");
                        return _context.abrupt('return', {
                            Links: db.collection('links'),
                            Owners: db.collection('owners'),
                            db: db,
                            database: database
                        });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function connect() {
        return _ref.apply(this, arguments);
    };
}();

exports.default = connect;