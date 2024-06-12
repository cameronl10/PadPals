import Pool from '../config/dbConnect';

interface WishGroup {
    color: String
    title: String
    houseid: String
};

export const typeDefs = `#graphql
    type WishGroup {
        color: String
        title: String
        houseid: String
    }
    type Mutation {
        editGroupTitle(houseID: String!, title: String!, updatedTitle: String!): WishGroup
        editGroupColor(houseID: String!, title: String!, updatedColor: String!): WishGroup
    }
    type Query {
        getGroup(houseID: String!, title: String!): WishGroup
    }
`;


export const resolvers = {
    Query: {
        getGroup: async (_: any, {houseID, title,}: any) => {
            return await getWishGroup(houseID, title);
        }
    },
    Mutation: {
        editGroupTitle: async (_: any, { houseID, title, updatedTitle }: any) => {
            return await editWishGroupTitle( houseID, title, updatedTitle );
        },
        editGroupColor: async (_: any, { houseID, title, updatedColor }: any) => {
            return await editWishGroupColor( houseID, title, updatedColor );
        }
    }
};

//Given houseID and title, update the title of the wishgroup
async function editWishGroupTitle( houseID: String , title: String, updatedTitle: String) {
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
async function editWishGroupColor( houseID: String , title: String, updatedColor: String  ) {
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