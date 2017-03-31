const path = require('path');

const config = {}

config.port = 3333;
config.rootPath = path.join(__dirname, '/../../../../');;
config.sessionSecret = 'this is my session secret';
config.collaboration = {
  enabled: true
};

/*                                                                               Mongo
====================================================================================== */

const MONGODB_STORE_URI = 'mongodb://127.0.0.1:27017/session_storage_test';
const MONGODB_STORE_COLLECTION = 'sessions';

config.mongoDBStore = {
  uri: MONGODB_STORE_URI,
  collection: MONGODB_STORE_COLLECTION
}

module.exports = config
