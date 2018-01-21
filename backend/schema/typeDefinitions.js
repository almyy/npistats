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
        gamesBySeason(season: Float!): [Game]!
        gamesByOwnerId(ownerId: String!): [Game]! 
        regularSeasonGamesByOwnerId(ownerId: String!): [Game]! 
        playOffGamesByOwnerId(ownerId: String!): [Game]
        ownerByOwnerId(ownerId: String!): Owner  
    }

    enum _ModelMutationType {
        CREATED
        UPDATED
        DELETED
    }
`;

export default typeDefs