const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3001;

app.use(cors());
dotenv.config();

const mysqli = mysql.createConnection({
    host: process.env.mysql_host,
    user: process.env.mysql_user,
    password: process.env.mysql_pass,
    database: process.env.mysql_dbase
});

mysqli.connect(function(err) {
    if(err) {
        console.error("Error connecting: " + err.stack);
        return;
    }

    console.log("Connected as id " + mysqli.threadId);
});

app.get("/", (req, res) => {
    mysqli.query('SELECT * from cms_news ORDER BY id DESC', (err, results) => {
        if(err) throw err;
        res.json(results);
    });
});

app.listen(HTTP_PORT, () => {
    console.log("Server running on PORT: ", HTTP_PORT);
});