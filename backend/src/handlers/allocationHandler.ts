import Pool from '../../config/dbConnect';

async function getAnAllocation(billid: string, userid: string): Promise<Allocation> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM allocation WHERE billid = $1 AND userid = $2', [billid, userid]);
        return result.rows[0];
    } catch (err) {
        throw new Error("Issue with getting allocations: " + err);
    } finally {
        client.release();
    }
}


async function createAllocation(allocation: CreateAllocation): Promise<boolean> {

    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO allocation(billid, userid, allocation, paid) VALUES($1, $2, $3, false) RETURNING *',
            [allocation.billid, allocation.userid, allocation.allocation]);
        return true;
    } catch (err) {
        throw new Error("Issue with creating allocation: " + err);
    } finally {
        client.release();
    }
};


async function editAllocation(allocation: EditAllocation): Promise<boolean> {

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
        return true;
    } catch (err) {
        throw new Error("Issue with editing allocation: " + err);
    } finally {
        client.release();
    }
};

async function deleteAllocation(billid: string, userid: string): Promise<boolean> {
    const client = await Pool.connect();
    try {
        await client.query('DELETE FROM allocation WHERE billid = $1 AND userid = $2', [billid, userid]);
        return true;
    } catch (err) {
        throw new Error("Issue with deleting allocation: " + err);
    } finally {
        client.release();
    }
};

// Owed user is the user that is owed money, not the user that owes money
async function getAllocationOwed(userId: string, owedUserid: string): Promise<number> {
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
    } catch (err) {
        throw new Error("Issue with getting allocation amount owed: " + err);
    } finally {
        client.release();
    }
}

async function payOffMultipleAllocations(payerid: string, payeeid: string): Promise<boolean> {
    const client = await Pool.connect();
    try {
        const payerAllocations = `
        UPDATE allocation a
        SET paid = true
        FROM bill b
        WHERE 
            a.billid = b.billid
            AND b.creatorid = $1
            AND a.userid = $2
            AND a.paid <> true
        `;
        await client.query(payerAllocations, [payeeid, payerid]);
        return true;
    } catch (err) {
        throw new Error("Error paying off multiple allocations: " + err);
    } finally {
        client.release();
    }
}

export { getAnAllocation, createAllocation, editAllocation, deleteAllocation, getAllocationOwed, payOffMultipleAllocations };
