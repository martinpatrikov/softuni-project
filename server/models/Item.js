const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    artist: { type: String, required: [true, 'Artist is required'] },
    file: { type: ObjectId, ref: 'FileMeta' }
});

const Item = model('Item', schema);

module.exports = Item;