import { resolve } from 'path';
import Pool from '../../config/dbConnect';


interface Wish {
    wishid: String
    userid: String
    name: String
    price: number
    purchased: Boolean
    houseid: String
    group: String
};

const resolvers = {
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
        editWish: async (_: any, { wishid, column, value }: any) => {
            return await EditWish(wishid, column, value);
        },
        editEntireWish: async (_: any, { wish }: any) => {
            return await EditEntireWish(wish);
        },
        deleteWish: async (_: any, { wishid }: any) => {
            return await DeleteWish(wishid);
        }
    },
};

async function CreateWish(wish: Wish) {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO wish(userid, houseid, wishgrouptitle, name, price, purchased) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [wish.userid, wish.houseid, wish.group, wish.name, wish.price, wish.purchased]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function EditWish(wishid: string, column: string, value: string) {
    const validInputs = ["name", "price", "wishgroup", "purchased"];
    if (!validInputs.includes(column)) {
        throw new Error('Column does not exist.');
    }
    const client = await Pool.connect();
    try {
        const result = await client.query(`UPDATE "Wish" SET ${column} = $1 WHERE wishid = $2 RETURNING *`, [value, wishid]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

//Function to edit the attributes you want in Edit
async function EditEntireWish(wish: Partial<Wish>) {
    const client = await Pool.connect();
    try {
        let query = 'UPDATE wish SET ';
        let values = [];
        let index = 1;

        for (let key in wish) {
            if (wish[key] !== undefined && key !== 'wishid') {
                query += `${key} = $${index}, `;
                values.push(wish[key]);
                index++;
            }
        }
        // Remove the last comma and space
        query = query.slice(0, -2);

        // Add the WHERE clause
        query += ` WHERE wishid = $${index} RETURNING *`;
        values.push(wish.wishid);

        const result = await client.query(query, values);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function DeleteWish(wishid: String) {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM wish WHERE wishid = $1', [wishid]);
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
        const result = await client.query('SELECT * FROM "Wish" WHERE wishid = $1', [wishID]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

export default resolvers;