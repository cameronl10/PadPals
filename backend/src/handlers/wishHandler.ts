import Pool from "../../config/dbConnect";
async function createWish(wish: Wish): Promise<boolean> {
    const client = await Pool.connect();
    try {
        await client.query('INSERT INTO wish(userid, houseid, wishgrouptitle, name, price, purchased) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [wish.userid, wish.houseid, wish.wishgrouptitle, wish.name, wish.price, wish.purchased]);
        return true;
    } catch (err) {
        throw new Error("Issue with creating a wish: " + err);
    } finally {
        client.release();
    }
};

async function editWish(wish: Partial<Wish>): Promise<boolean> {
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

        await client.query(query, values);

        return true;
    } catch (err) {
        throw new Error("Issue with editing a wish: " + err);
    } finally {
        client.release();
    }
}

async function deleteWish(wishid: String): Promise<boolean> {
    const client = await Pool.connect();
    try {
        await client.query('DELETE FROM wish WHERE wishid = $1', [wishid]);
        return true;
    } catch (err) {
        throw new Error("Issue with deleting a wish: " + err);
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
        throw new Error("Issue with getting a wish: " + err);
    } finally {
        client.release();
    }
};

// takes in a string of wishids, marks them all as purchased aka complete
async function markMultipleWishesAsDone(wishes: String[]): Promise<boolean> {
    const client = await Pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('UPDATE wish SET purchased = true WHERE wishid = ANY($1)', [wishes]);
        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        throw new Error("Issue with marking multiple wishes as done: " + err);
    } finally {
        client.release();
    }
}

export { getAWish, deleteWish, editWish, createWish, markMultipleWishesAsDone }