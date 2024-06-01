import pkg from 'pg';
import 'dotenv/config';
import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';

const {Pool} = pkg;


export const typeDefs = `#graphql
    type Wish{
        wishid: String
        userid: String
        houseid: String
        name: String
        price: number
        purchased: Boolean
    }

    type Mutation {
        createWish(wishid: String, userid: String, houseid: String, name: String, price: number, purchased: Boolean): Wish
        editWish()
    }

`;


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


export const resolvers = {
    Mutation: {
        createWish: async (_: any, {wishid, userid, houseid, name, price, purchased}: any) => {
            const client = await pool.connect();
            const newWish = {
                wishid,
                userid,
                houseid,
                name,
                price,
                purchased
            };
            await client.query(
                'INSERT INTO wishes (wishid, userid, houseid, name, price, purchased) VALUES ($1, $2, $3, $4, $5, $6)',
                [newWish.wishid, newWish.userid, newWish.houseid, newWish.name, newWish.price, newWish.purchased]
              );
            
            return newWish;
        },
        editWish: async (_: any) => {
            const client = await pool.connect();
        }
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers
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
    console.log('i love clee')
    try {
        const result = await client.query('SELECT * FROM \"User\"');
        console.log(result.rows);
        return result.rows;
    }catch(err){
        console.log(err);
    } finally {
        client.release();
    }
  }
