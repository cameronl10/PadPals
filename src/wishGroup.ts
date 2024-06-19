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
        editGroupTitle(houseID: String!, title: String!, updatedTitle: String!): WishGroup
        editGroupColor(houseID: String!, title: String!, updatedColor: String!): WishGroup
    }
    type Query {
        getGroup(houseID: String!, title: String!): WishGroup
    }
`;




export const resolvers = {
    Query: {
        getGroup: async (_: any, { houseID, title, }: any) => {
            return await getWishGroup(houseID, title);
        }
    },
    Mutation: {
        editGroupTitle: async (_: any, { houseID, title, updatedTitle }: any) => {
            return await editWishGroupTitle(houseID, title, updatedTitle);
        },
        editGroupColor: async (_: any, { houseID, title, updatedColor }: any) => {
            return await editWishGroupColor(houseID, title, updatedColor);
        },
        createWishGroup: async (_: any, { wishgroup }: any) => {
            return await CreateWishGroup(wishgroup);
        },
        deleteWishGroup: async (_: any, { title, houseid }: any) => {
            return await DeleteWishGroup(title, houseid);
        }
    }
};

//Given houseID and title, update the title of the wishgroup
async function editWishGroupTitle(houseID: String, title: String, updatedTitle: String) {
    const client = await Pool.connect();
    try {
        const result = await client.query(`UPDATE wishgroup SET title = $1 WHERE houseID = $2 AND title = $3 RETURNING *`, [updatedTitle, houseID, title]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

//Given houseID and title, update the color of the wishgroup
async function editWishGroupColor(houseID: String, title: String, updatedColor: String) {
    const client = await Pool.connect();
    try {
        const result = await client.query(`UPDATE wishgroup SET color = $1 WHERE houseID = $2 AND title = $3 RETURNING *`, [updatedColor, houseID, title]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function CreateWishGroup(wishgroup: WishGroup) {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO wishgroup (title, houseid, color) VALUES($1, $2, $3) RETURNING *',
            [wishgroup.title, wishgroup.houseid, wishgroup.color])
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

//Given houseID and title, return the wishgroup
async function getWishGroup(houseID: String, title: String): Promise<WishGroup> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM wishgroup WHERE houseid = $1 AND title = $2', [houseID, title]);
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