import Pool from '../../config/dbConnect';

interface User {
    userid: String,
    email : String,
    name : String,
    password: String,
    houseid : String
};

export const resolvers = {
    Query: {
    },
    Mutation: {
        editUserFields: async(_: any, { user } : any): Promise<void> => {
            return await EditUser(user);
        }
    }
};

async function EditUser(user: Partial<User>): Promise<void> {
    const client = await Pool.connect();
    try {
        let query = 'UPDATE account SET ';
        let values = [];
        let index = 1;

        for (let key in user) {
            if (user[key] !== undefined && key !== 'userid') {
                query += `${key} = $${index}, `;
                values.push(user[key]);
                index++
            }
        }

        query = query.slice(0, -2);

        query += ` WHERE userid = $${index} RETURNING *`;
        values.push(user.userid);

        const result = await client.query(query, values);

    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

export default resolvers;