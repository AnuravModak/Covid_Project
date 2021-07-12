const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.insertOne(document);

    
        
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    return coll.find({}).toArray();


    
};

exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
    //So doing like this will help us to tame callback hell problem.....we are not sending any callback 
};