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
        gamesByOwnerId: async (root, data, {mongo: { Games }}) => {
            return await Games.find({
                $or: [
                    {awayTeamId: data.ownerId},
                    {homeTeamId: data.ownerId}
                ]
            }).toArray();
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