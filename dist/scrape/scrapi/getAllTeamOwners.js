'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.mapAllTeamOwnersToTeamNames = exports.getOwnersForCurrentSeason = undefined;

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOwnersForCurrentSeason = exports.getOwnersForCurrentSeason = function getOwnersForCurrentSeason(response, season) {
    var $ = _cheerio2.default.load(response.data);

    var data = $(undefined);
    var teamNames = [];
    var owners = [];
    var ownerIds = [];
    var currentSeason = [];

    $('.teamName').each(function (element, e) {
        teamNames.push($(e).text());
    });
    $('.userName').each(function (i, e) {
        ownerIds.push($(e).attr('class').slice(16));
        owners.push($(e).text());
    });

    // console.log(season, teamNames)

    for (var u = 0; u < ownerIds.length; u++) {
        currentSeason.push({
            id: ownerIds[u],
            ownerName: owners[u],
            teamName: teamNames[u]
        });
    }
    return currentSeason;
};

var mapOwnerToTeamOwner = function mapOwnerToTeamOwner(owner) {
    return {
        id: owner.id,
        ownerName: owner.ownerName,
        teamNames: [owner.teamName]
    };
};

var mapAllTeamOwnersToTeamNames = exports.mapAllTeamOwnersToTeamNames = function mapAllTeamOwnersToTeamNames(seasonMap) {
    var teamOwners = [];
    Object.keys(seasonMap).map(function (key) {
        seasonMap[key].forEach(function (owner) {
            var team = teamOwners.filter(function (own) {
                return own.id === owner.id;
            })[0];
            var exists = team !== undefined;
            if (!exists) {
                teamOwners.push(mapOwnerToTeamOwner(owner));
            } else {
                var index = teamOwners.findIndex(function (elem) {
                    return elem.id === owner.id;
                });
                if (!teamOwners[index].teamNames.includes(owner.teamName)) {
                    teamOwners[index].teamNames.push(owner.teamName);
                }
            }
        });
    });
    return teamOwners;
};