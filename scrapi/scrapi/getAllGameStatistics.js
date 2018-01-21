import cheerio from "cheerio";
import axios from "axios";
import uuid from "uuid/v4";

const standings = {
  "2014": [
    { teamName: "Muhles Midget Mafia", place: 1 },
    { teamName: "MDR", place: 2 },
    { teamName: "Kentucky Chickens", place: 3 },
    { teamName: "prostyleMEGABLAST", place: 4 },
    { teamName: "Majestic Woodcocks", place: 5 },
    { teamName: "Fumble in the Jungle", place: 6 },
    { teamName: "such ball many foots", place: 7 },
    { teamName: "Cutler don't care", place: 8 },
    { teamName: "Trondheim TruseTwisters", place: 9 },
    { teamName: "Berger Bay Packers", place: 10 },
  ],

  "2015": [
    { teamName: "Fumble in the Jungle", place: 1 },
    { teamName: "Majestic Woodcocks", place: 2 },
    { teamName: "White Receivers", place: 3 },
    { teamName: "T-Dawg's Redemption Crew", place: 4 },
    { teamName: "FURU KAN SUGE SEG SELV", place: 5 },
    { teamName: "Devante Parker suger mega dick", place: 6 },
    { teamName: "Trondheim TruseTwisters", place: 7 },
    { teamName: "prostyleMEGAREBUILD", place: 8 },
    { teamName: "MDR", place: 9 },
    { teamName: "such ball many foots", place: 10 },
    { teamName: "Berger Bay Packers", place: 11 },
    { teamName: "Maere Monsters", place: 12 },
  ],
  "2016": [
    { teamName: "White Receivers", place: 1 },
    { teamName: "prostyleMEGAREBUILD", place: 2 },
    { teamName: "LeGarrette's Blunt", place: 3 },
    { teamName: "Kentucky Chickens", place: 4 },
    { teamName: "Maere Musehunterz", place: 5 },
    { teamName: "Trondheim TruseTwisters", place: 6 },
    { teamName: "Kirk's Cousins", place: 7 },
    { teamName: "Maerebowl contestant div Skien", place: 8 },
    { teamName: "Majestic Woodcocks", place: 9 },
    { teamName: "MDR", place: 10 },
  ],
  "2017": [
    { teamName: "Kentucky Chickens", place: 1 },
    { teamName: "Cam og co", place: 2 },
    { teamName: "Maere Musehunterz", place: 3 },
    { teamName: "To the playoff we Wentz RIP", place: 4 },
    { teamName: "White Receivers", place: 5 },
    { teamName: "Running Blacks", place: 6 },
    { teamName: "MDR", place: 7 },
    { teamName: "Fumble in the Jungle", place: 8 },
    { teamName: "HeiaAlleSammen", place: 9 },
    { teamName: "Majestic Woodcocks", place: 10 },
  ],
};

export const getGamesForCurrentWeek = (response, season, week, standings) => {
  const $ = cheerio.load(response.data);
  const currentWeek = [];
  let playOffRound = 0;

  if (season <= 2015 && week >= 14) {
    playOffRound = week - 13;
  } else if (season > 2015 && week >= 15) {
    playOffRound = week - 14;
  }

  $(".matchup").each((element, e) => {
    const game = { uuid: uuid() };
    const scores = $(e)
      .find(".teamTotal")
      .each((index, t) => {
        if (index === 0) {
          game["awayTeamScore"] = +$(t).text();
        } else {
          game["homeTeamScore"] = +$(t).text();
        }
      });
    let awayWinner = false;
    let tie = false;
    if (game["awayTeamScore"] > game["homeTeamScore"]) {
      awayWinner = true;
    }
    if (game["awayTeamScore"] === game["homeTeamScore"]) tie = true;

    const teams = $(e)
      .find(".teamWrap")
      .each((i, wrap) => {
        game["playOff"] = playOffRound > 0;
        if (playOffRound > 0) {
          const teamName = $(wrap)
            .find(".teamName")
            .text();
          if (season <= 2015) {
            const eligibleGames = standings.slice(0, 6 - 2 * (playOffRound - 1));
            // Has been beaten out of playoffs or are in consolidation;
            if (!eligibleGames.filter(e => e.teamName === teamName).length > 0) {
              return true;
            }
          } else {
            const eligibleGames = standings.slice(0, 4 - 2 * (playOffRound - 1));
            // Has been beaten out of playoffs or are in consolidation;
            if (!eligibleGames.filter(e => e.teamName === teamName).length > 0) {
              return true;
            }
          }
        }
        $(wrap)
          .find(".userName")
          .each((index, t) => {
            const teamId = $(t)
              .attr("class")
              .slice(16);
            if (i === 0) {
              game["awayTeamId"] = teamId;
              if (awayWinner) {
                game["winner"] = teamId;
              } else {
                game["loser"] = teamId;
              }
            } else {
              game["homeTeamId"] = teamId;
              if (awayWinner) {
                game["loser"] = teamId;
              } else {
                game["winner"] = teamId;
              }
            }
          });
      });
    if (!("awayTeamId" in game)) return true;
    if (tie) {
      game["loser"] = "TIE";
      game["winner"] = "TIE";
    }
    game["season"] = season;
    game["week"] = week;
    currentWeek.push(game);
  });
  return currentWeek;
};

const mapGameToGameObject = owner => ({
  id: owner.id,
  ownerName: owner.ownerName,
  teamNames: [owner.teamName],
});

const getStandings = season => {
  const winnerUrl = `http://fantasy.nfl.com/league/2273376/history/${season}/standings`;
  return axios.get(winnerUrl).then(response => {
    const $ = cheerio.load(response.data);
    const standings = [];
    $(".teamName").each((index, element) => {
      if (index > 0) {
        standings.push({
          teamName: $(element).text(),
          place: index,
        });
      }
    });
    return standings;
  });
};

export const getGamesForSeason = season => {
  const games = [];
  const promises = [];

  for (let i = 1; i < 17; i++) {
    var url = `http://fantasy.nfl.com/league/2273376/history/${season}/schedule?gameSeason=2017&leagueId=2273376&scheduleDetail=${i}&scheduleType=week&standingsTab=schedule`;
    promises.push(
      axios.get(url).then(response => {
        return getGamesForCurrentWeek(response, season, i, standings[season]);
      })
    );
  }
  return promises;
};
