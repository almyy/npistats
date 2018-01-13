import cheerio from 'cheerio';
import axios from 'axios';
import { each } from 'async';
import { listenerCount } from 'cluster';
import uuid from 'uuid/v4';

export const getGamesForCurrentWeek = (response, season, week) => {
    const $ = cheerio.load(response.data);
    const currentWeek = [];
        
    $('.matchup').each((element, e) => {
        const game = {uuid: uuid() };
        const scores = $(e).find('.teamTotal')
        .each((index, t) => {
            if (index === 0){
                game["awayTeamScore"] = +$(t).text()
            } else {
                game["homeTeamScore"] = +$(t).text()
            }
        });
        let awayWinner = false;
        let tie = false;
        if(game["awayTeamScore"] > game["homeTeamScore"]) {
            awayWinner = true;
        }
        if(game["awayTeamScore"] === game["homeTeamScore"]) tie = true;

        const teams = $(e).find('.teamWrap').find('.userName')
        .each((index, t) => {
            const teamId = $(t).attr('class').slice(16);
            if (index === 0){
                game["awayTeamId"] = teamId;
                if (awayWinner) {
                    game["winner"] = teamId;
                } else {
                    game["loser"] = teamId
                }
            } else {
                game["homeTeamId"] = teamId;
                if (awayWinner) {
                    game["loser"] = teamId;
                } else {
                    game["winner"] = teamId
                }
            }
        });
        if(tie) {
            game["loser"] = "TIE";    
            game["winner"] = "TIE";
        }
        game["season"] = season;
        game["week"] = week;
        currentWeek.push(game);
    });
    return currentWeek;
}

const mapGameToGameObject = (owner) => ({
    id: owner.id,
    ownerName: owner.ownerName,
    teamNames: [owner.teamName],
});

export const getGamesForSeason = (season) => {
    const promises = []
    const games = [];
    for(let i = 0; i < 17; i++) {
        var url = `http://fantasy.nfl.com/league/2273376/history/${season}/schedule?gameSeason=2017&leagueId=2273376&scheduleDetail=${i}&scheduleType=week&standingsTab=schedule`;
        promises.push(axios.get(url).then((response) => { return getGamesForCurrentWeek(response, season, i)}));    
    }

    return promises;
}