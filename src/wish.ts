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
    Mutation : {
        deleteWish : async (_: any, args: any) => {
            const { wishid } = args;
            return await DeleteWish(wishid);
        }
    }
};

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
