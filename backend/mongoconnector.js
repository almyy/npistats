const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = 'mongodb://localhost:27017';

const connect = async () => {
    const database = await MongoClient.connect(MONGO_URL);


    return {
        Links: database.db("npi").collection('links'),
    };
}

export default connect;