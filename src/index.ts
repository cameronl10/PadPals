import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import pkg from 'pg';
import 'dotenv/config';

const {Pool} = pkg;
interface User{
    name: String,
    id: number
}

const typeDefs = `#graphql
    type User{
        name: String
        id: Int
    }

    type Query{
        users: [User]
    }
`;
const mockUserdata = [
    {
        name: "Jay",
        id: 0
    },
    {
        name:"Erik",
        id: 1
    }
]
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

const resolvers = {
    Query: {
        users: testConnect
    }
}

function getUsers(): User[]{
    return mockUserdata;
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
  async function testConnect(){
    const client = await pool.connect();
    try{
        const result = await client.query('SELECT * FROM \"User\"');
        console.log(result.rows);
        return result.rows;
    }catch(err){
        console.log(err);
    } finally {
        client.release();
    }
  } 
  console.log(`🚀  Server ready at: ${url}`);
  testConnect();