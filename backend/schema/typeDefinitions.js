const typeDefs = `
    type Link {
        id: ID!
        url: String!
        description: String!
    }

    type Game {
        uuid: String!
        homeTeam: Owner!
        awayTeam: Owner!
        homeTeamScore: Float!
        awayTeamScore: Float!
        winner: String!
        loser: String!
        week: String!
        season: String!
    }

    type Owner {
        id: String!
        teamNames: [String]!
        ownerName: String!
    }

    type Query {
        allLinks: [Link!]!
        allOwners: [Owner]!
        allGames: [Game]!
        gamesByOwnerId(ownerId: String!): [Game]! 
        regularSeasonGamesByOwnerId(ownerId: String!): [Game]! 
        playOffGamesByOwnerId(ownerId: String!): [Game]
        ownerByOwnerId(ownerId: String!): Owner  
    }

    type Mutation {
        createLink(url: String!, description: String!): Link!
    }

    type Subscription {
        Link(filter: LinkSubscriptionFilter): LinkSubscriptionPayload
    }

    input LinkSubscriptionFilter {
        mutation_in: [_ModelMutationType!]
    }
      
    type LinkSubscriptionPayload {
        mutation: _ModelMutationType!
        node: Link
    }
      
    enum _ModelMutationType {
        CREATED
        UPDATED
        DELETED
    }
`;

export default typeDefs