"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var typeDefs = "\n    type Link {\n        id: ID!\n        url: String!\n        description: String!\n    }\n\n    type Query {\n        allLinks: [Link!]!\n    }\n\n    type Mutation {\n        createLink(url: String!, description: String!): Link!\n    }\n\n    type Subscription {\n        Link(filter: LinkSubscriptionFilter): LinkSubscriptionPayload\n    }\n\n    input LinkSubscriptionFilter {\n        mutation_in: [_ModelMutationType!]\n    }\n      \n    type LinkSubscriptionPayload {\n        mutation: _ModelMutationType!\n        node: Link\n    }\n      \n    enum _ModelMutationType {\n        CREATED\n        UPDATED\n        DELETED\n    }\n";

exports.default = typeDefs;