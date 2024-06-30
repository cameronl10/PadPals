import { ApolloServer } from 'apollo-server-express'; // Corrected import
import express from 'express';
import session from 'express-session';
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

const app = express();
app.use(session({
  secret:process.env.SESSION_SECRET
}))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:{
    test: "hello world"
  }
});
await server.start();
server.applyMiddleware({app});

async function startServer() {
  try {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
      testDBConnect(); // Ensure DB connection after server starts
      testRedisConnect();
    });
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