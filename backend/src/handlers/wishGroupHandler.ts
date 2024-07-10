import Pool from "../../config/dbConnect";
//Given houseID and title, update the title of the wishgroup
async function editWishGroupTitle(houseID: string, title: string, updatedTitle: string): Promise<WishGroup> {
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
async function editWishGroupColor(houseID: string, title: string, updatedColor: string): Promise<WishGroup> {
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

async function createWishGroup(wishgroup: WishGroup): Promise<void> {
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
async function getWishGroup(houseID: string, title: string): Promise<WishGroup> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM wishgroup WHERE houseid = $1 AND title = $2', [houseID, title]);
        return {
            houseid: houseID,
            title: title,
            color: result.rows[0].color
        }
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function deleteWishGroup(title: string, houseid: string): Promise<void> {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM wishgroup WHERE title = $1 AND houseid = $2', [title, houseid]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function getWishes(houseID: string, title: string): Promise<Wish[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query(`SELECT * FROM wish where houseid = $1 AND wishgrouptitle = $2`, [houseID, title]);
        const wishArr: Wish[] = result.rows;
        return wishArr;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function getWishGroups(houseid: string): Promise<WishGroup[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query(`SELECT * FROM wishgroup WHERE houseid = $1`, [houseid]);
        return result.rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

export { getWishGroup, getWishes, deleteWishGroup, createWishGroup, editWishGroupTitle, editWishGroupColor, getWishGroups }