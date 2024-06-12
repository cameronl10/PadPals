import Pool from '../config/dbConnect';

interface WishGroup {
    groupid: String
    title: String
    houseid: String
};


export const typeDefs = `#graphql
    type WishGroup{
        groupid: String
        title: String
        houseid: String
    }
    type Mutation {
    
    }
    type Query{

    }
`;




export const resolvers = {
    
};