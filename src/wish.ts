import pkg from 'pg';
import Pool from '../config/dbConnect'



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
        createWish: async (_: any, {wishid, userid, houseid, name, price, purchased}: any) => {
            const client = await Pool.connect();
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
            const client = await Pool.connect();
        },
        deleteWish : async (_: any, args: any) => {
            const { wishid } = args;
            return await DeleteWish(wishid);
        }
    },
}


async function DeleteWish(wishid: String){
const client = await Pool.connect();
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
