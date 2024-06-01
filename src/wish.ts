import pkg from 'pg';
const {Pool} = pkg;

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

export const typeDefs = `#graphql
    type Wish{
        wishid: String
        userid: String
        houseid: String
        name: String
        price: Int
        purchased: Boolean
    }

    type Mutation {
        createWish(wishid: String, userid: String, houseid: String, name: String, price: Int, purchased: Boolean): Wish
        deleteWish(wishid: String): DeleteWishResult
        editWish(wishid: String, userid: String, houseid: String, name: String, price: Int, purchased: Boolean): Wish
    }

    input DeleteWishInput { 
        wishID : String!
    }

    type DeleteWishResult {
        success : Boolean
        message : String
        wishID : String
    
    }

`;

export const resolvers = {
    Mutation: {
        // createWish: async (_: any, {wishid, userid, houseid, name, price, purchased}: any) => {
        //     const client = await pool.connect();
        //     const newWish = {
        //         wishid,
        //         userid,
        //         houseid,
        //         name,
        //         price,
        //         purchased
        //     };
        //     await client.query(
        //         'INSERT INTO wishes (wishid, userid, houseid, name, price, purchased) VALUES ($1, $2, $3, $4, $5, $6)',
        //         [newWish.wishid, newWish.userid, newWish.houseid, newWish.name, newWish.price, newWish.purchased]
        //       );
            
        //     return newWish;
        // },
        // editWish: async (_: any) => {
        //     const client = await pool.connect();
        // },
        deleteWish : async (_: any, args: any) => {
            const { wishid } = args;
            return await DeleteWish(wishid);
        }
    },
}


async function DeleteWish(wishid: String){
const client = await pool.connect();
try {
    const result = await client.query('DELETE FROM "wish" WHERE wishid = $1', [wishid]);
    return {
        success: true,
        message: "Wish deleted",
        wishID: wishid
    }
}catch(err){
    console.log(err);
} finally {
    client.release();
}
}
