const typeDefs = `
    type Link {
        id: ID!
        url: String!
        description: String!
    }

    type Query {
        allLinks: [Link!]!
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