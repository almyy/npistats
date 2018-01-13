var axios = require('axios');
var cheerio = require('cheerio');
var moment = require('moment');
import mapTeamNameAndOwners from './scrapi/mapTeamNameAndOwners';

var seasonStats = {};

var firstYear = 2014;

var currentActiveYear = moment().month() >= 10 ? moment().year() : moment().subtract(1, 'years').year();

for(var i = firstYear; i <= currentActiveYear; i++) {
    var url = `http://fantasy.nfl.com/league/2273376/history/${i}/owners`;
    seasonStats[i] = []
}

const newArr = Promise.all(Object.keys(seasonStats).map(key => {
    return axios.get(url).then((response) => {seasonStats[key] = mapTeamNameAndOwners(response)})
}))

newArr.then( () => {console.log(seasonStats);})