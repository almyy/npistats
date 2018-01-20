const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.MONGO_URL;

const connect = async () => {
    const database = await MongoClient.connect(MONGO_URL);
    const db = database.db("npi");
    return {
        Owners: db.collection('owners'),
        Games: db.collection('games'),
        database: database,
    };
}

export default connect;