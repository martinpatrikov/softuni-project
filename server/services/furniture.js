const { MongoClient } = require('mongodb');
const Item = require('../models/Item');


async function getAll() {
    return Item.find({});
}

async function create(item) {
    const result = new Item(item);
    await result.save();

    return result;
}

async function getById(id) {
    // console.log('here')
    const item = await Item.findById(id).populate('file');

    let result;

    // console.log('item ->' + item);

    //Connect to the MongoDB client

    // MongoClient.connect('mongodb://localhost:27017/audioplayer', function (err, client) {
    //     if (err) {
    //         throw new Error('Mongo Client connection error');
    //     }
    //     const db = client.db('audioplayer');
    //     const collection = db.collection('uploads.files');
    //     const collectionChunks = db.collection('uploads.chunks'); collection.find({ _id: item.file._id }).toArray(function (err, docs) {
    //         if (err) {
    //             throw new Error('Error finding file');
    //         }
    //         if (!docs || docs.length === 0) {
    //             throw new Error('Error finding file');
    //         } else {

    //             //Retrieving the chunks from the db          
    //             collectionChunks.find({ files_id: docs[0]._id })
    //                 .sort({ n: 1 }).toArray(function (err, chunks) {
    //                     if (err) {
    //                         throw new Error('Download error');
    //                     }
    //                     if (!chunks || chunks.length === 0) {
    //                         throw new Error('No data found');
    //                     }

    //                     let fileData = [];
    //                     for (let i = 0; i < chunks.length; i++) {
    //                         //This is in Binary JSON or BSON format, which is stored               
    //                         //in fileData array in base64 endocoded string format               

    //                         fileData.push(chunks[i].data.toString('base64'));
    //                     }

    //                     //Display the chunks using the data URI format          
    //                     let finalFile = 'data:' + docs[0].contentType + ';base64,'
    //                         + fileData.join('');
    //                     // item.finalFile = finalFile;
    //                     // console.log('furniture.js -> ' + item.finalFile);
    //                     // console.log(item)
    //                     // console.log(finalFile)
    //                     result = finalFile;
    //                     // console.log(result)
    //                     return finalFile;// {item, finalFile}; //item;
    //                 });
    //         }
    //     });
    // });
    // console.log(result)
    //return item;
}

async function update(id, item) {
    const existing = await Item.findById(id);

    existing.make = item.make;
    existing.model = item.model;
    existing.year = item.year;
    existing.description = item.description;
    existing.price = item.price;
    existing.img = item.img;
    existing.material = item.material;

    await existing.save();

    return existing;
}

async function deleteById(id) {
    await Item.findByIdAndDelete(id);
}


module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById
};