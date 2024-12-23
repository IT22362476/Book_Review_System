const mongoose = require('mongoose');

class Database {
    constructor() {
        if (!Database.instance) {
            this._connect();
            Database.instance = this;
        }
        return Database.instance;
    }

    _connect() {
        const URL = process.env.MONGODB_URL;

        if (!URL) {
            throw new Error("MongoDB connection URL is undefined. Make sure you have set MONGODB_URL in your .env file.");
        }

        mongoose.connect(URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        }).then(() => {
            console.log('MongoDB connection successful!');
        }).catch((error) => {
            console.error('MongoDB connection error:', error);
        });
    }

    getConnection() {
        return mongoose.connection;
    }
}

// Freeze the instance to prevent any modification
const instance = new Database();
Object.freeze(instance);

module.exports = instance;
