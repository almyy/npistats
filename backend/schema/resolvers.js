const mapToGameResponse = (game, homeTeam, awayTeam) => ({
    uuid: game.uuid,
    winner: game.winner,
    loser: game.loser,
    homeTeam: homeTeam,
    awayTeam: awayTeam,
    homeTeamScore: game.homeTeamScore,
    awayTeamScore: game.awayTeamScore,
    season: game.season,
    week: game.week,
});

const resolvers = {
    Query: {
        allLinks: async (root, data, {mongo: {Links}}) => { 
            return await Links.find({}).toArray();
        },
        allOwners: async (root, data, { mongo: { Owners }}) => { 
            return await Owners.find({}).toArray();
        },
        allGames: async (root, data, { mongo: { Games }}) => {
            return await Games.find({}).toArray();
        },
        regularSeasonGamesByOwnerId: async (root, data, {mongo: { Games, Owners}}) => {
            const owners = await Owners.find({}).toArray();
            const games = await Games.find({
                $and: [
                    {playOff: false},
                    {
                        $or: [
                            {awayTeamId: data.ownerId},
                            {homeTeamId: data.ownerId}
                        ], 
                    }
                ]
            }).toArray();

            const promises = [owners, games];
            return await Promise.all(promises).then(result => {
                return games.map(game => {
                    const awayTeam = owners.filter(owner => {
                        return owner.id == game.awayTeamId;
                    })[0];
                    const homeTeam = owners.filter(owner => {
                        return owner.id == game.homeTeamId;
                    })[0];
                      
                    return mapToGameResponse(game, homeTeam, awayTeam);
                });
            });
        },
        playOffGamesByOwnerId: async (root, data, {mongo: { Games, Owners}}) => {
            const owners = await Owners.find({}).toArray();
            const games = await Games.find({
                $and: [
                    {playOff: true},
                    {
                        $or: [
                            {awayTeamId: data.ownerId},
                            {homeTeamId: data.ownerId}
                        ], 
                    }
                ]
            }).toArray();

            const promises = [owners, games];
            return await Promise.all(promises).then(result => {
                return games.map(game => {
                    const awayTeam = owners.filter(owner => {
                        return owner.id == game.awayTeamId;
                    })[0];
                    const homeTeam = owners.filter(owner => {
                        return owner.id == game.homeTeamId;
                    })[0];
                      
                    return mapToGameResponse(game, homeTeam, awayTeam);
                });
            });
        },
        gamesByOwnerId: async (root, data, {mongo: { Games, Owners }}) => {
            const owners = await Owners.find({}).toArray();
            const games = await Games.find({
                $or: [
                    {awayTeamId: data.ownerId},
                    {homeTeamId: data.ownerId}
                ]
            }).toArray();

            const promises = [owners, games];
            return await Promise.all(promises).then(result => {
                return games.map(game => {
                    const awayTeam = owners.filter(owner => {
                        return owner.id == game.awayTeamId;
                    })[0];
                    const homeTeam = owners.filter(owner => {
                        return owner.id == game.homeTeamId;
                    })[0];
                      
                    return mapToGameResponse(game, homeTeam, awayTeam);
                });
            });
        },
        ownerByOwnerId: async (root, data, { mongo: {Owners }}) => {
            return await Owners.findOne({id : data.ownerId});
        }
    },
  
    Mutation: {
        createLink: async (root, data, {mongo: {Links}}) => {
            const newLink = {id: 21, ...data};
            const response = await Links.insert(newLink); 
            return Object.assign({id: response.insertedIds[0]}, newLink);
        }
    },
  
    Link: {
        id: root => root._id || root.id,
    },
    Subscription: {
        Link: {
            subscribe: () => pubsub.asyncIterator('Link'),
        },
    },
  };

  export default resolvers;