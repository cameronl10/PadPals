import Pool from '../config/dbConnect';

interface Wish {
    wishid: String
    userid: String
    houseid: String
    name: String
    price: number
    purchased: Boolean
};


export const typeDefs = `#graphql
    type Wish{
        wishid: String
        userid: String
        houseid: String
        name: String
        price: Int
        purchased: Boolean
    }
    input WishInput{
        userid: String!
        houseid: String!
        name: String!
        price: Int!
        purchased: Boolean!
    }
    type Mutation {
        createWish(wish: WishInput!): Wish
        editWish(inputWishId: String, column: String, value: String): Wish
        deleteWish(wishid: String): Wish
    }
    type Query{
        getWishes: [Wish]
        getWish(wishID: String!): Wish
    }
`;




export const resolvers = {
    Query: {
        getWishes: getAllWishes,
        getWish: async (_: any, args: any) => {
            const { wishID } = args;
            return await getAWish(wishID);
        }
    },
    Mutation: {
        createWish: async (_: any, { wish }: any) => {
            return await CreateWish(wish);
        },
        editWish: async (_: any, { inputWishId, column, value }: any) => {
            return await EditWish(inputWishId, column, value);
        },
        deleteWish: async (_: any, args: any) => {
            const { wishid } = args;
            return await DeleteWish(wishid);
        }
    },
};

async function CreateWish(wish: Wish) {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO wish(userid, houseid, name, price, purchased) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [wish.userid, wish.houseid, wish.name, wish.price, wish.purchased]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function EditWish(inputWishId: string, column: string, value: string) {
    const validInputs = ["name", "price", "purchased"];
    if (!validInputs.includes(column)) {
        throw new Error('Column does not exist.');
    }
    
    const client = await Pool.connect();
    try {
        const result = await client.query(`UPDATE wish SET ${column} = $1 WHERE wishid = $2 RETURNING *`, [value, inputWishId]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function DeleteWish(wishid: String) {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM "wish" WHERE wishid = $1', [wishid]);
        return {
            success: true,
            message: "Wish deleted",
            wishID: wishid
        }
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function getAllWishes(): Promise<Wish[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM wish');
        return result.rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function getAWish(wishID: String): Promise<Wish> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM wish WHERE wishid = $1', [wishID]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};