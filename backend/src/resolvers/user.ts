import { create } from 'domain';
import Pool from '../../config/dbConnect';
import * as bcrypt from 'bcrypt';

interface User {
    userid: String,
    email: String,
    name: String,
    password: String,
    houseid: String,
    profilepicture: String
};

export const resolvers = {
    Query: {
        loginUser: async (_: any, { email, password }: any, context) => {
            return await UserLogin(email, password, context);
        }
    },
    Mutation: {
        createUser: async (_: any, { user }: any) => {
            return await CreateUser(user);
        },
        editUserFields: async (_: any, { user }: any): Promise<void> => {
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

async function CreateUser(user: User): Promise<void> {
    const client = await Pool.connect();
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const result = await client.query(
            `INSERT INTO account(email, name, password, houseid, profilepicture) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user.email, user.name, hashedPassword, user.houseid, user.profilepicture]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function UserLogin(email: String, pass: String, context): Promise<String> {
    const client = await Pool.connect();
    const user = await client.query(`SELECT * FROM account WHERE email = $1`, [email]);
    if (user == null) {
        console.log("User not found");
        return null;
    }
    try {
        if (await bcrypt.compare(pass, user.rows[0].password)) {
            context.session.userID = user.rows[0].userid;
            context.session.username = user.rows[0].name;
            console.log("Logged in")
            console.log(context.session);
            return user.rows[0];
        } else {
            console.log("Incorrect password")
            return null;
        }


    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}
export default resolvers;