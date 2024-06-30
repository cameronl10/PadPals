import { get } from 'http';
import Pool from '../../config/dbConnect';

interface Bill {
    billid: String,
    houseid: String,
    creatorid: String,
    title: String,
    price: number,
    purchased : boolean,
    interval_val: number
};

export const resolvers = {
    Query: {
        getBills: async (_: any, { houseid }: any) => {
            return await GetBills(houseid);
        }
    },
     Mutation: {
        createBill: async (_: any, { bill }: any): Promise<Bill> => {
            return await CreateBill(bill);
        },
        editBill: async (_: any, { bill }: any): Promise<void> => {
            return await EditBill(bill);
        },
        deleteBill: async (_: any, { billid }: any): Promise<void> => {
            return await DeleteBill(billid);
        }
     }
};

// Get all bills by houseid
async function GetBills(houseid: string): Promise<Bill[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM bill WHERE houseid = $1', [houseid]);
        const bills = result.rows.map(bill => ({
            billid: bill.billid,
            houseid: bill.houseid,
            creatorid: bill.creatorid,
            title: bill.title,
            price: bill.price,
            purchased: bill.purchased,
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
async function CreateBill(bill: Bill): Promise<Bill> {
    const client = await Pool.connect();
    try {
        const result = await client.query('INSERT INTO bill(houseid, creatorid, title, price, purchased, interval_val) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
            [bill.houseid, bill.creatorid, bill.title, bill.price, bill.purchased, bill.interval_val]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

//edits a bill with the given bill object
async function EditBill(bill: Partial<Bill>): Promise<void> {
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
async function DeleteBill(billid: String): Promise<void> {
    const client = await Pool.connect();
    try {
        await client.query('DELETE FROM bill WHERE billid = $1', [billid]);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}
export default resolvers;