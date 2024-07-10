import Pool from '../../config/dbConnect';

async function getAllocations(billid: String): Promise<Allocation[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM allocation WHERE billid = $1', [billid]);
        const allocations = result.rows.map(allocation => ({
            billid: allocation.billid,
            userid: allocation.userid,
            allocation: allocation.allocation,
            paid: allocation.paid
        }));
        return allocations;
    } catch (err) {
        console.log(err);
        throw err; // Re-throw the error after logging it
    } finally {
        client.release();
    }
}

async function createAllocation(allocation: Allocation): Promise<Allocation> {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO allocation(billid, userid, allocation, paid) VALUES($1, $2, $3, false) RETURNING *',
            [allocation.billid, allocation.userid, allocation.allocation]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function editAllocation(allocation: Partial<Allocation>): Promise<Allocation> {
    const client = await Pool.connect();
    try {
        let query = 'UPDATE allocation SET ';
        let values = [];
        let index = 1;

        for (let key in allocation) {
            if (allocation[key] !== undefined && key !== 'billid' && key !== 'userid') {
                query += `${key} = $${index}, `;
                values.push(allocation[key]);
                index++;
            }
        }

        // Remove the last comma and space
        query = query.slice(0, -2);

        // Add the WHERE clause
        let useridindex = index + 1;
        query += ` WHERE billid = $${index} AND userid = $${useridindex} RETURNING *`;
        values.push(allocation.billid, allocation.userid);

        const result = await client.query(query, values);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function deleteAllocation(billid: String, userid: String): Promise<void> {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM allocation WHERE billid = $1 AND userid = $2', [billid, userid]);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

// Owed user is the user that is owed money, not the user that owes money
async function getAllocationOwed(userId: String, owedUserid: String): Promise<number> {
    const client = await Pool.connect();
    try {
        // Left join on the bill with allocation table to get the total amount owed
        const query = `
            SELECT
                SUM(b.price * a.allocation) AS amount_owed
            FROM bill b
            LEFT JOIN
                allocation a ON b.billid = a.billid
            WHERE
                b.creatorid = $2 AND a.userid = $1
                AND a.paid <> true
        `;
        const values = [userId, owedUserid];
        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            return result.rows[0].amount_owed;
        } else {
            return 0;
        }
    } catch(err) {
        console.log(err);
    } finally {
        client.release();
    }
}

export { getAllocations, createAllocation, editAllocation, deleteAllocation, getAllocationOwed };
