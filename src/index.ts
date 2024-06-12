import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import 'dotenv/config';
import _ from 'lodash';
import Pool from '../config/dbConnect';
import { 
    typeDefs as wishType,
    resolvers as wishResolvers
} from './wish';
import {
    typeDefs as wishGroupType,
    resolvers as wishGroupResolvers
} from './wishGroup';



const typeDefs = `#graphql
    type User{
        name: String
        userid: String
    }

    type Query{
        users: [User]
    }
`;



const resolvers = {
    Query: {
        users: testConnect
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs : [typeDefs, wishType, wishGroupType],
    resolvers : _.merge(wishResolvers, resolvers, wishGroupResolvers),
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  async function testConnect(){
    const client = await Pool.connect();
    try {
        const client = await Pool.connect();
        console.log("connectecd to DB")
    }catch(err){
        console.log(err);
    } finally {
        client.release();
    }
  }

  console.log(`🚀  Server ready at: ${url}`);
  testConnect();