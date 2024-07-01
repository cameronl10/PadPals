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
import RedisStore from 'connect-redis';
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

//  resolvers need to be loaded asynchronously
const resolvers = await loadResolvers;

const app = express();
const httpServer = http.createServer(app);

connectToRedis();
const redisStore = new RedisStore({ client: redisClient })

app.use(express.json());
app.use(session({
  store: redisStore,
  secret: process.env.SESSION_SECRET,
  cookie: {
    expires: new Date(253402300000000), /// Approximately Friday, 31 Dec 9999 23:59:59 GMT
    secure: false // turn this on when in production
  },
  saveUninitialized: false,
  resave: false
}));


const server = new ApolloServer({
  typeDefs,
  resolvers
});

await server.start();

app.use('/graphql', expressMiddleware(server, {
  context: async ({ req }: { req: any }) => ({
    session: req.session
  }),
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

async function connectToRedis() {
  const client = await redisClient.connect();
  try {
    console.log("Connected to redis");
  } catch (err) {
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
  }
}

startServer();