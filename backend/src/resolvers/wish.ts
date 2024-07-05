import { resolve } from 'path';
import Pool from '../../config/dbConnect';


interface WishGroup {
    title: String
    houseid: String
    color: String
    wishes: Wish[]
};
interface Wish {
    wishid: String
    userid: String
    name: String
    price: number
    purchased: Boolean
    wishGroup: WishGroup
    group: String
};

const resolvers = {
    Query: {
        wish: async (_: any, args: any): Promise<Wish> => {
            const { wishID } = args;
            return await getAWish(wishID);
        }
    },
    Mutation: {
        createWish: async (_: any, { wish }: any): Promise<Wish> => {
            return await CreateWish(wish);
        },
        editWish: async (_: any, { wish }: any): Promise<void> => {
            return await EditWish(wish);
        },
        deleteWish: async (_: any, { wishid }: any): Promise<void> => {
            return await DeleteWish(wishid);
        }
    },
    Wish: {
        wishGroup: async (parent: Wish): Promise<WishGroup> => {
            console.log(parent.wishGroup.houseid, parent.wishGroup.title)
            return await getWishGroup(parent.wishGroup.houseid, parent.wishGroup.title);
        }
    }
};

function getWishGroup(houseID: String, title: String): Promise<WishGroup> {
    return Promise.resolve({ title: "", houseid: "", color: "", wishes: [] });
}

async function CreateWish(wish: Wish): Promise<Wish> {
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

async function EditWish(wish: Partial<Wish>): Promise<void> {
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

async function DeleteWish(wishid: String): Promise<void> {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM wish WHERE wishid = $1', [wishid]);
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