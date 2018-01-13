'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapTeamNameAndOwners = function mapTeamNameAndOwners(response, year) {
    var $ = _cheerio2.default.load(response.data);

    var data = $(undefined);
    var teamNames = [];
    var owners = [];
    var ownerIds = [];
    var currentSeason = [];
    var currentYear = "";

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

exports.default = mapTeamNameAndOwners;