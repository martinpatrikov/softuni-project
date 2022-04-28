const { MongoClient } = require('mongodb');
const {Item} = require('../models/Item');


async function getAll() {
    return Item.find({});
}

async function create(item) {
    const result = new Item(item);
    await result.save();

    return result;
}

async function getById(id) {
    const item = await Item.findById(id).populate('file');

    return item;

}

async function update(id, item) {
    const existing = await Item.findById(id);

    existing.artist = item.artist;
    existing.name = item.name;

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