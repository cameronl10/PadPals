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
        createWish(userid: String, houseid: String, name: String, price: Int, purchased: Boolean): Wish
        editWish(inputWishId: String, column: String, value: String): Wish
    }

`;




export const resolvers = {
    Mutation: {
        createWish: async (_: any, {userid, houseid, name, price, purchased}: any) => {
            const client = await Pool.connect();
            const newWish = {
                userid,
                houseid,
                name,
                price,
                purchased
            };
            await client.query(
                'INSERT INTO wish (userid, houseid, name, price, purchased) VALUES ($1, $2, $3, $4, $5)',
                [newWish.userid, newWish.houseid, newWish.name, newWish.price, newWish.purchased]
              );
            
            return newWish;
        },
        // inputWishId = takes in the wish you're editing
        // column = takes in "name", "price", or "purchased" to see which value you're editing
        // value = takes in the new value
        editWish: async (inputWishId: any, column: column, value: any) => {
            try {
                const client = await Pool.connect();
                await client.query(`UPDATE wish SET ${column} = ${value} WHERE wishid = ${inputWishId}`);
            } catch(err) {
                console.log(err);
            }
        }
    },
}
