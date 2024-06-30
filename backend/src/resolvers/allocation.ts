import Pool from '../../config/dbConnect';

interface Allocation {
    billid: String,
    userid: String,
    allocation: Number,
    paid: Boolean
};

export const resolvers = {
    Query: {
        getAllocations: async (_: any, { billid }: any): Promise<Allocation> => {
            return await GetAllocations(billid);
        }
    },
    Mutation: {
        createAllocation: async (_: any, { allocation }: any): Promise<Allocation> => {
            return await CreateAllocation(allocation);
        },
        editAllocation: async (_: any, { allocation }: any): Promise<Allocation> => {
            return await EditAllocation(allocation);
        },
        deleteAllocation: async (_: any, { billid, userid }: any): Promise<void> => {
            return await DeleteAllocation(billid, userid);
        }
    }
};

async function GetAllocations(billid: String): Promise<Allocation> {
    const client = await Pool.connect();
    try {
        const result = await client.query('SELECT * FROM allocation WHERE billid = $1', [billid]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function CreateAllocation(allocation: Allocation): Promise<Allocation> {
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

async function EditAllocation(allocation: Partial<Allocation>): Promise<Allocation> {
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

async function DeleteAllocation(billid: String, userid: String): Promise<void> {
    const client = await Pool.connect();
    try {
        const result = await client.query('DELETE FROM allocation WHERE billid = $1 AND userid = $2', [billid, userid]);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

export default resolvers;