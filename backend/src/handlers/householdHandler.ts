import Pool from '../../config/dbConnect';

// Get a household by houseid
async function GetHousehold(houseid: string, context): Promise<Household> {
    const client = await Pool.connect();
    console.log(context.session);
    try {
        const result = await client.query('SELECT * FROM household WHERE houseid = $1', [houseid]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function CreateHousehold(household: Household): Promise<Household> {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO household(name, address) VALUES($1, $2) RETURNING *',
            [household.name, household.address]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function EditHousehold(household: Partial<Household>): Promise<void> {
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

async function DeleteHousehold(houseid: String): Promise<void> {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM household WHERE houseid = $1', [houseid]);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

export { GetHousehold, CreateHousehold, EditHousehold, DeleteHousehold };