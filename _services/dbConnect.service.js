// EXTERNAL
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
var response = require('./response.service');

/**
* DBConnect
* DB connection and closure utilities
*
* @function connectSystemDB
* @function connectMasterDB
* @function connectYearDB
* @function closeDB
*/

var DBConnect = {

  /**
  * @function connectSystemDB
  * To return a mongoose model of a collection in systemDB
  *
  * @param req          request
  * @param res          response
  * @param model        Name of collection model
  * @param schema       Mongoose schema
  *
  * @return { Mongoose collection model }
  */
  connectSystemDB: async(req, res, model, schema) => {
    try {
      console.log('MONGO_SYSTEM_URI %s', process.env.MONGO_SYSTEM_URI);

      const opt = {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD,
        auth: {
          authdb: 'admin'
        },
        promiseLibrary: require("bluebird")
      }

      console.log(opt);

      const systemDb = await mongoose.createConnection(process.env.MONGO_SYSTEM_URI, opt);

      mongoose.set('debug', true);

      return systemDb.model(model, schema);
    }
    catch (err) {
      err['data'] = 'Error in connecting server and create collection model!';
      return response.fail_serverError(res, err);
    }
  },

  /**
  * @function connectMasterDB
  * To return a mongoose model of a collection in client's MasterDB
  *
  * @param req          request
  * @param res          response
  * @param clientCode   initial name of client = prefix of client's database
  * @param model        Name of collection model
  * @param schema       Mongoose schema
  *
  * @return { Mongoose collection model }
  */
  connectMasterDB: async(req, res, model, schema, clientCode) => {
    try {
      const ConstantsBase = require('../base.constants');
      // const DbUri = ConstantsBase.urlMongo;
      const DbUri = process.env.MONGO_URI;
      const masterDb = await mongoose.createConnection(
        DbUri + clientCode + "_0000",
        {
          promiseLibrary: require("bluebird")
        }
      );
      return masterDb.model(model, schema);
    }
    catch (err) {
      err['data'] = 'Error in connecting server and create collection model!';
      return response.fail_serverError(res, err);
    }
  },

  /**
  * @function connectYearDB
  * To return a mongoose model of a collection in client's YearDB
  *
  * @param req          request
  * @param res          response
  * @param clientCode   initial name of client = prefix of client's database
  * @param year         working year
  * @param model        Name of collection model
  * @param schema       Mongoose schema
  *
  * @return { Mongoose collection model }
  */
  connectYearDB: async(req, res, model, schema, clientCode, year) => {
    try {
      const ConstantsBase = require('../base.constants');
      // const DbUri = ConstantsBase.urlMongo;
      const DbUri = process.env.MONGO_URI;
      const yearDb = await mongoose.createConnection(
        DbUri + clientCode + "_" + year,
        {
          promiseLibrary: require("bluebird")
        }
      );
      return yearDb.model(model, schema);
    }
    catch (err) {
      err['data'] = 'Error in connecting server and create collection model!';
      return response.fail_serverError(res, err);
    }
  },

  /**
  * @function closeDB
  * To close DB Connection
  *
  * @param req          request
  * @param res          response
  * @param DBConnection
  */
  closeDB: async(req, res, DBConnection) => {
    try {
      if (DBConnection) {
        DBConnection.close()
          .then(() => console.log('System DB is closed!'))
          .catch((err) => {
            throw new Error('Failed to close system DB. Error: ' + err.message)
          });
      }
    }
    catch (err) {
      return response.handle_server_error(res, err);
    }
  },
}

module.exports = DBConnect;
