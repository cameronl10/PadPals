import Pool from '../config/dbConnect';

interface WishGroup {
    title: String
    houseid: String
    color: String
};


export const typeDefs = `#graphql
    input WishGroupInput{
        title: String!
        houseid: String!
        color: String!
    }
    input WishGroupDelete{
        title: String!
        housid: String!
    }
    type WishGroup{
        title: String
        houseid: String
        color: String
    }
    type Mutation {
        createWishGroup(wishgroup: WishGroupInput!): WishGroup
        deleteWishGroup(title: String, houseid: String): WishGroup
    }
`;




export const resolvers = {
    Mutation: {
        createWishGroup: async (_: any, { wishgroup }: any) => {
            return await CreateWishGroup(wishgroup);
        },
        deleteWishGroup: async (_: any, { title, houseid }: any) => {
            return await DeleteWishGroup(title, houseid);
        }
    },
};

async function CreateWishGroup(wishgroup: WishGroup) {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO wishgroup (title, houseid, color) VALUES($1, $2, $3) RETURNING *',
            [wishgroup.title, wishgroup.houseid, wishgroup.color]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function DeleteWishGroup(title: String, houseid: String) {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM wishgroup WHERE title = $1 AND houseid = $2', [title, houseid]);
        return {
            success: true,
            message: "WishGroup deleted"
        }
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};