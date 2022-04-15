const { default: mongoose } = require('mongoose');
const { model, Schema, Types: { ObjectId } } = require('mongoose');

const schema = new Schema({
    name: { type: String, required: [true, 'Name is required'] },
    artist: { type: String, required: [true, 'Artist is required'] },
    file: { type: ObjectId, ref: 'FileMeta' }
});

const Item = model('Item', schema);

mongoose.model('FileMeta', new mongoose.Schema({}, {
    collection: 'uploads.files',
}));

const FilesMeta = mongoose.model('FileMeta');

module.exports = {Item, FilesMeta};