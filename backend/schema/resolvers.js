import { Game, Owner } from "../mongooseconnector";

const resolvers = {
  Query: {
    allOwners: async (root, data) => {
      return await Owner.find({}).exec();
    },
    allGames: async (root, data) => {
      return await Game.find({}).exec();
    },
    gamesBySeason: async (root, data) => {
      if (data.season) {
        return await Game.find({ season: data.season }).exec();
      } else {
        return await Game.find({}).exec();
      }
    },
    regularSeasonGamesByOwnerId: async (root, data) => {
      return await Game.find({
        $and: [
          { playOff: false },
          {
            $or: [{ awayTeamId: data.ownerId }, { homeTeamId: data.ownerId }],
          },
        ],
      }).exec();
    },
    playOffGamesByOwnerId: async (root, data) => {
      return await Game.find({
        $and: [
          { playOff: true },
          {
            $or: [{ awayTeamId: data.ownerId }, { homeTeamId: data.ownerId }],
          },
        ],
      }).exec();
    },
    gamesByOwnerId: async (root, data) => {
      return await Game.find({
        $or: [{ awayTeamId: data.ownerId }, { homeTeamId: data.ownerId }],
      }).exec();
    },
    ownerByOwnerId: async (root, data) => {
      return await Owner.findOne({ id: data.ownerId });
    },
  },

  Game: {
    async homeTeam(game, rest) {
      return await Owner.findOne({ id: game.homeTeamId });
    },
    async awayTeam(game, rest) {
      return await Owner.findOne({ id: game.awayTeamId });
    },
  },
};

export default resolvers;
