import Pool from '../../config/dbConnect';

const resolvers = {
    Query: {
        wishGroup: async (_: any, { houseID, title, }: any): Promise<WishGroup> => {
            return await getWishGroup(houseID, title);
        }
    },
    Mutation: {
        editGroupTitle: async (_: any, { houseID, title, updatedTitle }: any): Promise<WishGroup> => {
            return await editWishGroupTitle(houseID, title, updatedTitle);
        },
        editGroupColor: async (_: any, { houseID, title, updatedColor }: any): Promise<WishGroup> => {
            return await editWishGroupColor(houseID, title, updatedColor);
        },
        createWishGroup: async (_: any, { wishgroup }: any): Promise<void> => {
            return await CreateWishGroup(wishgroup);
        },
        deleteWishGroup: async (_: any, { title, houseid }: any): Promise<void> => {
            return await DeleteWishGroup(title, houseid);
        }
    },
    WishGroup: {
        wishes: async (parent: WishGroup): Promise<Wish[]> => {
            return await getWishes(parent.houseid, parent.title);
        }
    },
    Wish: {
        wishGroup: async (parent: Wish): Promise<WishGroup> => {
            return await getWishGroup(parent.group.houseid, parent.group.title);
        }
    }
};

//Given houseID and title, update the title of the wishgroup
async function editWishGroupTitle(houseID: String, title: String, updatedTitle: String): Promise<WishGroup> {
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
async function editWishGroupColor(houseID: String, title: String, updatedColor: String): Promise<WishGroup> {
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

async function CreateWishGroup(wishgroup: WishGroup): Promise<void> {
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
        return {
            houseid: houseID,
            title: title,
            color: result.rows[0].color,
            wishes: []
        }
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function DeleteWishGroup(title: String, houseid: String): Promise<void> {
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

async function getWishes(houseID: String, title: String): Promise<Wish[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query(`SELECT * FROM wish where houseid = $1 AND wishgrouptitle = $2`, [houseID, title]);
        const wishArr = result.rows;
        let wishResult: Wish[] = [];
        wishArr.forEach(wish => {
            wishResult.push({
                ...wish,
                wishGroup: { houseid: houseID, title: title }
            });
        });
        return wishResult;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}
export default resolvers;