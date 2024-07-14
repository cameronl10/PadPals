import Pool from "../../config/dbConnect";
// Get a household by houseid
async function getHousehold(houseid: string): Promise<Household> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM household WHERE houseid = $1', [houseid]);
        return result.rows[0];
    } catch (err) {
        throw new Error("Issue with getting household: " + err);
    } finally {
        client.release();
    }
};

async function getHouseholdByUser(userid: string): Promise<Household> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM household WHERE houseid = (SELECT houseid FROM account WHERE userid = $1)', [userid]);
        return result.rows[0];
    } catch (err) {
        throw new Error("Issue with getting household by userid: " + err);
    } finally {
        client.release();
    }
}

async function createHousehold(household: Household): Promise<boolean> {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO household(name, address) VALUES($1, $2) RETURNING *',
            [household.name, household.address]);
        return result.rows[0];
    } catch (err) {
        throw new Error("Issue with creating household: " + err);
    } finally {
        client.release();
    }
}

async function editHousehold(household: Partial<Household>): Promise<boolean> {
    const client = await Pool.connect();
    try {
        let query = 'UPDATE household SET ';
        let values = [];
        let index = 1;

        for (let key in household) {
            if (household[key] !== undefined && key !== 'houseid') {
                query += `${key} = $${index}, `;
                values.push(household[key]);
                index++;
            }
        }

        // Remove the last comma and space
        query = query.slice(0, -2);

        // Add the WHERE clause
        query += ` WHERE houseid = $${index} RETURNING *`;
        values.push(household.houseid);

        await client.query(query, values);

        return true;
    } catch (err) {
        throw new Error("Issue with editing household: " + err);
    } finally {
        client.release();
    }
}

async function deleteHousehold(houseid: string): Promise<boolean> {
    const client = await Pool.connect();
    try {
        await client.query('DELETE FROM household WHERE houseid = $1', [houseid]);
        return true;
    } catch (err) {
        throw new Error("Issue with deleting household: " + err);
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
        throw new Error("Issue with getting wishgroups from a household: " + err);
    } finally {
        client.release();
    }
}

async function getUsers(household): Promise<User[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query(`SELECT * FROM account WHERE houseid = $1`, [household]);
        return result.rows;
    } catch (err) {
        throw new Error("Issue with getting users in a household: " + err);
    } finally {
        client.release();
    }
}

// Get all bills by houseid
async function getBills(houseid: string): Promise<Bill[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM bill WHERE houseid = $1', [houseid]);
        const bills = result.rows.map(bill => ({
            billid: bill.billid,
            houseid: bill.houseid,
            creatorid: bill.creatorid,
            title: bill.title,
            price: bill.price,
            paid: bill.paid,
            interval_val: bill.interval_val
        }));
        return bills;
    } catch (err) {
        throw new Error("Issue with getting bills: " + err);
    } finally {
        client.release();
    }
};

export { getHousehold, getHouseholdByUser, createHousehold, editHousehold, deleteHousehold, getWishGroups, getUsers, getBills };
