const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
dotenv.config(); // Load environment variables
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
module.exports = app;

const db = require('./Database');

db.getConnection().once("open", () => {
    console.log("MongoDB connection is active.");
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const bookRouter = require("./Routes/Books.js");
app.use("/book",bookRouter);

if (process.env.NODE_ENV !== "test") {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server is up and running on port number: ${PORT}`);
    });
}