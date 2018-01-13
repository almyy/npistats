'use strict';

var axios = require('axios');
var cheerio = require('cheerio');
var moment = require('moment');

var seasonStats = {};

var firstYear = 2014;

var currentActiveYear = moment().month() >= 10 ? moment().year() : moment().subtract(1, 'years').year();

var butItDo = function butItDo(response, year) {
    var $ = cheerio.load(response.data);

    var data = $(undefined);
    var teamNames = [];
    var owners = [];
    var ownerIds = [];
    var currentSeason = [];

    $('.teamName').each(function (element, e) {
        currentYear = $(e).attr('href').slice(24).substr(0, 4);
        teamNames.push($(e).text());
    });
    $('.userName').each(function (i, e) {
        ownerIds.push($(e).attr('class').slice(16));
        owners.push($(e).text());
    });

    for (var u = 0; u < ownerIds.length; u++) {
        currentSeason.push({
            id: ownerIds[u],
            ownerName: owners[u],
            teamName: teamNames[u]
        });
    }
    return currentSeason;
};

for (var i = firstYear; i <= currentActiveYear; i++) {
    var url = 'http://fantasy.nfl.com/league/2273376/history/' + i + '/owners';
    seasonStats[i] = [];
}

var newArr = Promise.all(Object.keys(seasonStats).map(function (key) {
    return axios.get(url).then(function (response) {
        return butItDo(response);
    });
}));

newArr.then();