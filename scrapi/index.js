var axios = require('axios');
var cheerio = require('cheerio');
var moment = require('moment');
import { mapAllTeamOwnersToTeamNames, getOwnersForCurrentSeason } from './scrapi/getAllTeamOwners';
import { getGamesForSeason } from './scrapi/getAllGameStatistics';

import connect from '../backend/mongoconnector'

var seasonMap = {};

var firstYear = 2014;

var currentActiveYear = moment().month() >= 10 ? moment().year() : moment().subtract(1, 'years').year();

for(var i = firstYear; i <= currentActiveYear; i++) {
    seasonMap[i] = []
}

const scrapeForOwners = async () => {
    const mongo = await connect();
    const owners = mongo.Owners;

    const newArr = Promise.all(Object.keys(seasonMap).map(key => {
        var url = `http://fantasy.nfl.com/league/2273376/history/${key}/owners`;
        return axios.get(url).then((response) => {seasonMap[key] = getOwnersForCurrentSeason(response, key)})
    }))

    newArr.then( () => {
        owners.insertMany(mapAllTeamOwnersToTeamNames(seasonMap)).then(()=> {
            mongo.database.close();
        });
    })
};

const scrapeForGames = async () => {
    const mongo = await connect();
    const games = mongo.Games;

    for(let i = firstYear; i <= currentActiveYear; i++){
        Promise.all(getGamesForSeason(i)).then(res => {
            const flatArray = Array.prototype.concat.apply([], res)
            games.insertMany(flatArray);
        });
    }
}
// scrapeForGames();
// scrapeForOwners();

