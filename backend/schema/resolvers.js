import { Game, Owner } from '../mongooseconnector';
import Mongo from '../mongoconnector';

const mapToGameResponse = (game, homeTeam, awayTeam, time) => ({
    uuid: game.uuid,
    winner: game.winner,
    loser: game.loser,
    homeTeamScore: game.homeTeamScore,
    awayTeamScore: game.awayTeamScore,
    season: game.season,
    week: game.week,
    time: time
});

const resolvers = {
    Query: {
        allOwners: async (root, data) => { 
            return await Owner.find({}).exec();
        },
        allGames: async (root, data) => {
            return await Game.find({}).exec();
        },
        regularSeasonGamesByOwnerId: async (root, data) => {
            return await Game.find({
                $and: [
                    {playOff: false},
                    {
                        $or: [
                            {awayTeamId: data.ownerId},
                            {homeTeamId: data.ownerId}
                        ], 
                    }
                ]
            }).exec();
        },
        playOffGamesByOwnerId: async (root, data) => {
            return await Game.find({
                $and: [
                    {playOff: true},
                    {
                        $or: [
                            {awayTeamId: data.ownerId},
                            {homeTeamId: data.ownerId}
                        ], 
                    }
                ]
            }).exec();
        },
        gamesByOwnerId: async (root, data) => {
            return await Game.find({
                $or: [
                    {awayTeamId: data.ownerId},
                    {homeTeamId: data.ownerId}
                ]
            }).exec();
        },
        ownerByOwnerId: async (root, data) => {
            return await Owner.findOne({id : data.ownerId});
        }
    },

    Game: {
        async homeTeam(game, rest) {
            return await Owner.findOne({id: game.homeTeamId});
        },
        async awayTeam(game, rest) {
            return await Owner.findOne({id: game.awayTeamId})
        }
    },
  };

  export default resolvers;