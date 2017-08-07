var mongoose = require('mongoose');

/**
 * botkit-storage-mongoose - MongoDB/Mongoose driver for Botkit
 *
 * @param  {Object} config Must contain a mongoUri property
 * @return {Object} A storage object conforming to the Botkit storage interface
 */
module.exports = function(config) {

    if (!config) {
        throw new Error('Need to provide mongo address or a mongoose instance');
    }

    if (!config.mongoUri || !config.db) {
        throw new Error('Need to provide mongo address or a mongoose instance');
    }

    var db = config.db || mongoose.createConnection(config.mongoUri);
    var storage = {};
    var zones = (typeof config.tables !== 'undefined' && Array.isArray(config.tables))?config.tables:['teams', 'channels', 'users'];

    zones.forEach(function(zone) {
        var model = createModel(db, zone);
        storage[zone] = getStorage(model);
    });

    return storage;
};

function createModel(db, zone) {
    var schema = new mongoose.Schema({}, {
        strict: false,
        collection: zone
    });
    return db.model(zone, schema);
}

function getStorage(model) {
    return {
        get: function(id, cb) {
            model.findOne({
                id: id
            }).lean().exec(cb);
        },
        save: function(data, cb) {
            model.findOneAndUpdate({
                id: data.id
            }, data, {
                upsert: true,
                new: true
            }).lean().exec(cb);
        },
        all: function(cb) {
            model.find({}).lean().exec(cb);
        }
    };
}
