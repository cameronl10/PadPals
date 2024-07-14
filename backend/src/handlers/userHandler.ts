import Pool from '../../config/dbConnect';
import * as bcrypt from 'bcrypt';


async function deleteUser(userid: string): Promise<void> {
    const client = await Pool.connect();
    try {
        const result = await client.query(`DELETE FROM account WHERE userid = $1`, [userid]);
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function editUserPassword(userid: string, oldpassword: string, newpassword: string): Promise<void> {
    const client = await Pool.connect();
    //Check if user exists
    const user = await client.query(`SELECT * FROM account WHERE userid = $1`, [userid]);
    if (user.rows[0] == null) {
        console.log("User not found");
        return null;
    }
    try {
        //check if oldpassword is valid before changing password
        if (await bcrypt.compare(oldpassword, user.rows[0].password)) {
            console.log("Logged in, attempting to change password")
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            const result = await client.query(
                `UPDATE account SET password = $1 WHERE userid = $2 RETURNING *`, [hashedPassword, userid]);
            console.log("Successfully changed password")
            return result.rows[0];
        } else {
            console.log("Incorrect password, can't edit password")
            return null;
        }
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function getUser(email): Promise<User> {
    const client = await Pool.connect();
    try {
        const result = await client.query(`SELECT * FROM account WHERE email = $1`, [email]);
        return result.rows[0];
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function getUsers(household): Promise<User[]> {
    const client = await Pool.connect();
    try {
        const result = await client.query(`SELECT * FROM account WHERE houseid = $1`, [household]);
        return result.rows;
    } catch (err) {
        console.log(err);
    } finally {
        client.release();
    }
}

async function editUser(user: Partial<User>): Promise<void> {
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

async function createUser(user: User): Promise<void> {
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

async function userLogin(email: string, pass: string, context): Promise<string> {
    const client = await Pool.connect();
    const user = await client.query(`SELECT * FROM account WHERE email = $1`, [email]);
    if (user == null) {
        throw new Error("User not found");
    }
    try {
        if (await bcrypt.compare(pass, user.rows[0].password)) {
            context.session.userid = user.rows[0].userid;
            context.session.username = user.rows[0].name;
            context.session.houseid = user.rows[0].houseid;
            return user.rows[0];
        } else {
            throw new Error("Wrong password");
        }

    } catch (err) {
        throw new Error("Error logging in: " + err);
    } finally {
        client.release();
    }
}

async function userLogout(context: any): Promise<boolean> {
    try {
        context.req.session.destroy();
        return true;
    } catch (err) {
        throw new Error("Error logging out");
    }
}

export { createUser, userLogin, editUser, getUser, getUsers, editUserPassword, deleteUser, userLogout };  
