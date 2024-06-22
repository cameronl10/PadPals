import { ApolloServer } from '@apollo/server'; // Corrected import
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config';
import _ from 'lodash';
import Pool from '../config/dbConnect';
import redisClient from '../config/redisConnect';
import loadResolvers from './resolvers/merger';
import typeDefs from './schemas/merger';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

//  resolvers need to be loaded asynchronously
const resolvers = await loadResolvers;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  try {
    // Starting the Apollo Server
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`🚀 Server ready at: ${url}`);
    await testDBConnect(); // Ensure DB connection after server starts
    await testRedisConnect();
  } catch (error) {
    console.error('Error starting server or connecting to DB:', error);
  }
}

async function testDBConnect() {
  const client = await Pool.connect();
  try {
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  } finally {
    client.release();
  }
}

async function testRedisConnect() {
  const client = await redisClient.connect();
  try {
    console.log("Connected to redis");
  } catch (err) {
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
  }
}

startServer();