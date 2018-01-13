const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost:27017';

const connect = async () => {
    const database = await MongoClient.connect(MONGO_URL);
    const db = database.db("npi");
    return {
        Links: db.collection('links'),
        Owners: db.collection('owners'),
        db: db,
        database: database,
    };
}

export default connect;