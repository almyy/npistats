const resolvers = {
    Query: {
      allLinks: async (root, data, {mongo: {Links}}) => { 
        return await Links.find({}).toArray();
      },
    },
  
    Mutation: {
        createLink: async (root, data, {mongo: {Links}}) => {
            console.log(root)
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