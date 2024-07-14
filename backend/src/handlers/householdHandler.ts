import Pool from "../../config/dbConnect";
// Get a household by houseid
async function getHousehold(houseid: string): Promise<Household> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM household WHERE houseid = $1', [houseid]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
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
        console.log(err);
    } finally {
        client.release();
    }
}

async function createHousehold(household: Household, context: Express.Request): Promise<Household> {
    const client = await Pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('INSERT INTO household(name, address, adminuser) VALUES($1, $2, $3) RETURNING *',
            [household.name, household.address, context.session.userid]);
        await client.query('UPDATE account SET houseid = $1 WHERE userid = $2',
            [household.houseid,context.session.userid]);
        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err);
    } finally {
        client.release();
    }
}

async function editHousehold(household: Partial<Household>): Promise<void> {
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

        const result = await client.query(query, values);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function deleteHousehold(houseid: string): Promise<void> {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM household WHERE houseid = $1', [houseid]);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

export { getHousehold, getHouseholdByUser, createHousehold, editHousehold, deleteHousehold };
