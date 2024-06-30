import Pool from '../../config/dbConnect';

interface User {
    userid: String,
    email : String,
    name : String,
    password: String,
    houseid : String
};

export const resolvers = {
    Query: {
    },
    Mutation: {
    }
};

export default resolvers;