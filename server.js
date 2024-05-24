require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT;

app.use(express.json());

//Databse params
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/users', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM \"User\"")
        res.json(result.rows);
    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});