import Pool from "../../config/dbConnect";
import redisClient from '../../config/redisConnect';

async function connectToRedis() {
    await redisClient.connect();
    try {
      console.log("Connected to redis");
    } catch (err) {
      redisClient.on('error', (err) => console.log('Redis Client Error', err));
    }
  }

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

async function createHousehold(household: Household, context: Express.Request): Promise<boolean> {
    const client = await Pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('INSERT INTO household(name, adminid) VALUES($1, $2, $3) RETURNING *',
            [household.name, context.session.userid]);
        await client.query('UPDATE account SET houseid = $1 WHERE userid = $2',
            [household.houseid, context.session.userid]);
        await client.query('COMMIT');
        return true;
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err);
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

async function deleteHousehold(houseid: string, context: Express.Request): Promise<boolean> {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM household WHERE houseid = $1 AND adminid = $2', [houseid, context.session.userid]);
        if (result.rowCount > 0) {
            return true;
        } else {
            throw new Error();
        }
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
        return result.rows;
    } catch (err) {
        throw new Error("Issue with getting bills: " + err);
    } finally {
        client.release();
    }
};

// create an 8-digit alphanumerical random join code as key,
// with houseid as value, expires in 30 mins
async function createHouseCode(houseid: string): Promise<boolean> {
    try {
        const existingCode = await redisClient.get(houseid);
        if (existingCode) { // if there is already a house id join code, replace
            await redisClient.del(houseid);
            await redisClient.del(existingCode);
        }
        const newCode = Math.random().toString(36).substring(2, 8);
        await redisClient.set(newCode, houseid, {EX: 1800});
        await redisClient.set(houseid, newCode, {EX: 1800});
        return true;
    } catch (err) {
        throw new Error("Error creating join code: " + err);
    }
}

// checks given joinCode. if exists, returns relevant houseid. if nonexistent, returns null.
async function checkHouseCode(joinCode: string): Promise<string> {
    try {
        const houseid = await redisClient.get(joinCode);
        if (houseid) {
            return houseid;
        }
        return null;
    } catch (err) {
        throw new Error("Error checking join code: " + err);
    }
}

export { getHousehold, getHouseholdByUser, createHousehold, editHousehold, deleteHousehold, getWishGroups, getUsers, getBills, createHouseCode, checkHouseCode };
