import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import session from 'express-session';
import 'dotenv/config';
import Pool from '../config/dbConnect';
import redisClient from '../config/redisConnect';
import loadResolvers from './resolvers/merger';
import typeDefs from './schemas/merger';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

//  resolvers need to be loaded asynchronously
const resolvers = await loadResolvers;

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(session({
  secret: "tempsecretkey"
}))

const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();

app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }) => ({ test: "hello world" }),
  }
));

async function startServer() {
  try {
    const PORT = process.env.PORT;
    await new Promise<void>((resolve) => {
      httpServer.listen(PORT, resolve)
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
    testDBConnect(); // Ensure DB connection after server starts
    testRedisConnect();
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