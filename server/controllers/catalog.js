const router = require('express').Router();
const api = require('../services/furniture');
const {
    isAuth,
    isOwner
} = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');
const preload = require('../middlewares/preload');
const mongoose = require('mongoose');
const {
    Item
} = require('../models/Item');
const multer = require('multer');
const {
    GridFsStorage
} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require('fs');
const {
    FilesMeta
} = require('../models/Item');
const User = require('../models/User');

// Mongo URI
const mongoURI = 'mongodb://localhost:27017/audioplayer';
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            const fileInfo = {
                filename: filename,
                bucketName: 'uploads'
            };
            resolve(fileInfo);
        });
    }
});

const upload = multer({
    storage
});

// TODO trying to save it here
let audio;

router.get('/', async (req, res) => {
    try {
        let data = await api.getAll();
        if (req.user) {
            const user = await User.findById(req.user._id);
            // data = data.map(item => Object.assign({}, item, {isAdded: user.playlist.includes(item._id)}));
            data = data.map(item => Object.assign({}, item, { isAdded: user.playlist.includes(item._id) }));
        }else{
            data = data.map(item => Object.assign({}, item, { isAdded: false }));
        }


        res.json(data);
    } catch (err) {
        console.error(err);
    }

});

router.get('/playlist', async (req, res) => {
    let data = await api.getAll();
    const user = await User.findById(req.user._id);
    // data = data.map(item => Object.assign({}, item, {isAdded: user.playlist.includes(item._id)}));
    let result = [];
    data.forEach(item => {
        if (user.playlist.includes(item._id)) {
            result.push(item);
        }
    });

    res.json(result);
});


router.post('/', isAuth(), upload.single('file'), async (req, res) => {
    // TODO The file is not received in the right format
    // console.log('hjere')
    // console.log(rseq);
    const item = {
        name: req.body.name,
        artist: req.body.artist,
        file: req.file.id
    };

    try {
        const result = await api.create(item);
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({
            message: error
        });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id)
    // const item = await Item.findById(id).populate('file');
    // console.log(item);
    const file = await FilesMeta.findById(id);
    console.log(file);

    const db = mongoose.connection;
    let bucket;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'uploads'
    });

    try {
        bucket.openDownloadStream(mongoose.Types.ObjectId(file._doc._id)).pipe(res);
        // TODO trying to save it here
        audio = bucket.openDownloadStream(mongoose.Types.ObjectId(file._doc._id));
        
    } catch (err) {
        console.log('bucket');
        console.error(err);
    }
});

// TODO trying to save it here
router.get('/play', async (req, res) => {
    try {
        return audio;
    } catch (err) {
        console.log('bucket');
        console.error(err);
    }
});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        const itemId = req.params.id;
        await api.deleteById(itemId);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({
            message: error
        });
    }
});

module.exports = router;