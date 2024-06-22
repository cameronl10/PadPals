import Pool from '../../config/dbConnect';

interface Household {
    householdid: String,
    name: String,
    address: String,
};


export const typeDefs = `#graphql
    type Mutation {
    }
    type Query {
    }
`;

export const resolvers = {
    Query: {
    },
    Mutation: {
    }
};

export default resolvers;