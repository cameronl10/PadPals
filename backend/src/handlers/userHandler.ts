import Pool from '../../config/dbConnect';
import * as bcrypt from 'bcrypt';


async function deleteUser(userid: string): Promise<boolean> {
    const client = await Pool.connect();
    try {
        await client.query(`DELETE FROM account WHERE userid = $1`, [userid]);
        return true;
    } catch (err) {
        throw new Error("Issue with deleting user: " + err);
    } finally {
        client.release();
    }
}

async function editUserPassword(userid: string, oldpassword: string, newpassword: string): Promise<boolean> {
    const client = await Pool.connect();
    //Check if user exists
    const user = await client.query(`SELECT * FROM account WHERE userid = $1`, [userid]);
    if (user.rows[0] == null) {
        console.log("User not found");
        return false;
    }
    try {
        //check if oldpassword is valid before changing password
        if (await bcrypt.compare(oldpassword, user.rows[0].password)) {
            console.log("Logged in, attempting to change password")
            const hashedPassword = await bcrypt.hash(newpassword, 10);
            const result = await client.query(
                `UPDATE account SET password = $1 WHERE userid = $2 RETURNING *`, [hashedPassword, userid]);
            console.log("Successfully changed password")
            return true;
        } else {
            console.log("Incorrect password, can't edit password")
            return false;
        }
    } catch (err) {
        throw new Error("Issue with editing user password: " + err);
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
        throw new Error("Issue with getting a user by email: " + err);
    } finally {
        client.release();
    }
}

async function getUserByID(userid: string): Promise<User> {
    const client = await Pool.connect();
    try {
        const result = await client.query(`SELECT * FROM account WHERE userid = $1`, [userid]);
        return result.rows[0];
    } catch (err) {
        throw new Error("Issue with getting a user by userid: " + err);
    } finally {
        client.release();
    }
}

async function editUser(user: Partial<User>): Promise<boolean> {
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

        await client.query(query, values);

        return true;
    } catch (err) {
        throw new Error("Issue with editing user: " + err);
    } finally {
        client.release();
    }
}

async function createUser(user: User): Promise<boolean> {
    const client = await Pool.connect();
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await client.query(
            `INSERT INTO account(email, name, password, houseid, profilepicture) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user.email, user.name, hashedPassword, user.houseid, user.profilepicture]);
        return true;
    } catch (err) {
        throw new Error("Issue with creating user: " + err);
    } finally {
        client.release();
    }
}

async function userLogin(email: string, pass: string, context: Express.Request): Promise<string> {
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
            context.session.email = user.rows[0].email;
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

async function userLogout(context: Express.Request): Promise<boolean> {
    try {
        context.session.destroy();
        return true;
    } catch (err) {
        throw new Error("Error logging out: " + err);
    }
}

export { createUser, userLogin, editUser, getUser,getUserByID, editUserPassword, deleteUser, userLogout };  
