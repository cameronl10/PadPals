import Pool from '../../config/dbConnect';

//Mutations
//Creates a bill with the given bill object
async function createBill(bill: Bill): Promise<boolean> {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO bill(houseid, creatorid, title, price, paid, interval_val) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [bill.houseid, bill.creatorid, bill.title, bill.price, bill.paid, bill.interval_val]);
        return true;
    } catch (err) {
        throw new Error("Issue with creating bill: " + err);
    } finally {
        client.release();
    }
}

//edits a bill with the given bill object
async function editBill(bill: Partial<Bill>): Promise<boolean> {
    const client = await Pool.connect();
    try {
        let query = 'UPDATE bill SET ';
        let values = [];
        let index = 1;

        for (let key in bill) {
            if (bill[key] !== undefined && key !== 'billid') {
                query += `${key} = $${index}, `;
                values.push(bill[key]);
                index++;
            }
        }

        query = query.slice(0, -2);
        query += ` WHERE billid = $${index}`;
        values.push(bill.billid);
        await client.query(query, values);

        return true;
    } catch (err) {
        throw new Error("Issue with editing bill: " + err);
    } finally {
        client.release();
    }
}

//Deletes a bill with the given billid
async function deleteBill(billid: string): Promise<boolean> {
    const client = await Pool.connect();
    try {
        await client.query('DELETE FROM bill WHERE billid = $1', [billid]);
        return true;
    } catch (err) {
        throw new Error("Issue with deleting bill: " + err);
    } finally {
        client.release();
    }
}

//Gets single bill by billid
async function getBill(billid: string): Promise<Bill> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM bill WHERE billid = $1', [billid]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
        throw err; // Re-throw the error after logging it
    } finally {
        client.release();
    }
}

//Get all allocations by billid
async function getAllocations(billid: string): Promise<Allocation[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM allocation WHERE billid = $1', [billid]);

        return result.rows;
    } catch (err) {
        throw new Error("Issue with getting bill: " + err);
    } finally {
        client.release();
    }
}

export { createBill, editBill, deleteBill, getBill, getAllocations };