import { ApolloServer } from '@apollo/server'; // Corrected import
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config';
import _ from 'lodash';
import Pool from '../config/dbConnect';

import resolvers from './resolvers/merger';
import typeDefs from './schemas/merger';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  console.log(typeDefs);
  console.log(resolvers);
  try {
    // Starting the Apollo Server
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at: ${url}`);
    await testConnect(); // Ensure DB connection after server starts
  } catch (error) {
    console.error('Error starting server or connecting to DB:', error);
  }
}

async function testConnect() {
  const client = await Pool.connect();
  try {
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

startServer();