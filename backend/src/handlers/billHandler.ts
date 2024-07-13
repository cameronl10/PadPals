import Pool from '../../config/dbConnect';
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
        console.log(err);
        throw err; // Re-throw the error after logging it
    } finally {
        client.release();
    }
};


//Mutations
//Creates a bill with the given bill object
async function createBill(bill: Bill): Promise<Bill> {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO bill(houseid, creatorid, title, price, paid, interval_val) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [bill.houseid, bill.creatorid, bill.title, bill.price, bill.paid, bill.interval_val]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

//edits a bill with the given bill object
async function editBill(bill: Partial<Bill>): Promise<void> {
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
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

//Deletes a bill with the given billid
async function deleteBill(billid: string): Promise<void> {
    const client = await Pool.connect();
    try {
        await client.query('DELETE FROM bill WHERE billid = $1', [billid]);
    } catch (err) {
        console.log(err);
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

export { getBills, createBill, editBill, deleteBill, getBill, getAllocations };