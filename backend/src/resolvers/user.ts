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
        loginUser: async (_: any, {email, password }: any) => {
            return await UserLogin(email, password);
        },
        getUser: async(_: any, { email } : any): Promise<User> => {
            return await GetUser(email);
        }

    },
    Mutation: {
        createUser: async (_: any, { user }: any) => {
            return await CreateUser(user);
        },
        editUserFields: async(_: any, { user } : any): Promise<void> => {
            return await EditUser(user);
        }
    }
};

async function GetUser(email): Promise<User> {
    const client = await Pool.connect();
    try {
        const result = await client.query(`SELECT * FROM account WHERE email = $1`, [email]);
        return result.rows[0];
    } catch(err) {
        console.log(err);
    } finally {
        client.release();
    }
}
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
            `INSERT INTO account(email, name, password, houseid, profilepicture) VALUES ($1, $2, $3, $4, 5) RETURNING *`, 
            [user.email, user.name, hashedPassword, user.houseid, user.profilepicture]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function UserLogin(email: String, pass: String): Promise<String> {
    const client = await Pool.connect();
    const user = await client.query(`SELECT * FROM account WHERE email = $1`, [email]);
    if (user == null) {
        console.log("User not found");
        return null;
    }
    try {
       if(await bcrypt.compare(pass, user.rows[0].password)) {
              console.log("Logged in")
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