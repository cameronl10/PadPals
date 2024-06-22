import Pool from '../../config/dbConnect';

interface Household {
    houseid: String,
    name: String,
    address: String,
};

export const resolvers = {
    Query: {
        getHousehold: async (_: any, { houseid}: any) => {
            return await GetHousehold(houseid);
        } 
    },
};

// Get a household by houseid
async function GetHousehold(houseid: string): Promise<Household>{
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

export default resolvers;