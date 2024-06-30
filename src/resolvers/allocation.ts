import Pool from '../../config/dbConnect';

interface Allocation {
    billid: String,
    userid: String,
    allocation: Number,
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
        const result = await client.query('INSERT INTO allocation(billid, userid, allocation) VALUES($1, $2, $3) RETURNING *',
            [allocation.billid, allocation.userid, allocation.allocation]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
};

async function EditAllocation(allocation: Allocation): Promise<Allocation> {
    const client = await Pool.connect();
    try {
        const result = await client.query('UPDATE allocation SET allocation = $1 WHERE billid = $2 AND userid = $3 RETURNING *',
            [allocation.allocation, allocation.billid, allocation.userid]);
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
