import Pool from '../../config/dbConnect';
import * as bcrypt from 'bcrypt';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromEnv } from "@aws-sdk/credential-providers";
import 'dotenv/config';

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
            `INSERT INTO account(email, name, password, profilepicture) VALUES ($1, $2, $3, $4) RETURNING *`,
            [user.email, user.name, hashedPassword, user.profilepicture]);
        return true;
    } catch (err) {
        throw new Error("Issue with creating user: " + err);
    } finally {
        client.release();
    }
}

async function userLogin(email: string, password: string, context: Express.Request): Promise<string> {
    const client = await Pool.connect();
    const user = await client.query(`SELECT * FROM account WHERE email = $1`, [email]);
    if (user.rows[0] == null) {
        const userError = new Error();
        userError.message = ("User not found");
        throw userError;
    }
    try {
        if (await bcrypt.compare(password, user.rows[0].password)) {
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

async function assignHousehold(userid: string, houseid: string): Promise<boolean> {
    const client = await Pool.connect();
    try {
        await client.query('UPDATE account set houseid = $1 WHERE userid = $2', [houseid, userid]);
        return true;
    } catch (err) {
        throw new Error("Issue with assigning household: " + err)
    }
}

async function uploadProfilePhoto(userid: string): Promise<string> {
    const s3Client = new S3Client({
        region: process.env.AWS_REGION || 'us-east-1',
    });
    const bucketName = "padpals";
    const params = {
        Bucket: bucketName,
        Key: `${userid}/profile-photo`
    };

    try {
        const command = new PutObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return url;
    } catch (err) {
        throw new Error(`Issue with uploading profile photo for user ${userid}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
}

export { createUser, userLogin, editUser, getUser, getUserByID, editUserPassword, deleteUser, userLogout, assignHousehold, uploadProfilePhoto };