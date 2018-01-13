'use strict';

var _mapTeamNameAndOwners = require('./scrapi/mapTeamNameAndOwners');

var _mapTeamNameAndOwners2 = _interopRequireDefault(_mapTeamNameAndOwners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = require('axios');
var cheerio = require('cheerio');
var moment = require('moment');


var seasonStats = {};

var firstYear = 2014;

var currentActiveYear = moment().month() >= 10 ? moment().year() : moment().subtract(1, 'years').year();

for (var i = firstYear; i <= currentActiveYear; i++) {
    var url = 'http://fantasy.nfl.com/league/2273376/history/' + i + '/owners';
    seasonStats[i] = [];
}

var newArr = Promise.all(Object.keys(seasonStats).map(function (key) {
    return axios.get(url).then(function (response) {
        seasonStats[key] = (0, _mapTeamNameAndOwners2.default)(response);
    });
}));

newArr.then(function () {
    console.log(seasonStats);
});