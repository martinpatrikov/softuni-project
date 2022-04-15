const router = require('express').Router();
const api = require('../services/furniture');
const { isAuth, isOwner } = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');
const preload = require('../middlewares/preload');
const mongoose = require('mongoose');
const {Item }= require('../models/Item');
const multer = require('multer');
const {
    GridFsStorage
} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const fs = require('fs');
const { FilesMeta } = require('../models/Item');

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

const upload = multer({ storage });

router.get('/', async (req, res) => {
    console.log(req.user);
    const data = await api.getAll();
    res.json(data);
});


router.post('/', isAuth(), upload.single('file'), async (req, res) => {
    // TODO The file is not received in the right format
    console.log('hjere')
    console.log(req);
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
        res.status(400).json({ message: error });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const item = await Item.findById(id).populate('file');
    const file = await FilesMeta.findById(item.file._id)

    const db = mongoose.connection;
    let bucket;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'FileMeta'
    });
    console.log('file = ' + file.filename)
    // bucket.openDownloadStreamByName(file.filename).pipe(fs.createWriteStream('../uploads/' + item.file.filename));

    // const result = await bucket.find({ filename: item.file.filename }).toArray((err, files) => {
    //     if (!files[0] || files.length == 0) {
    //         console.log('no file');
    //         return res.status(200).json({
    //             success: false,
    //             message: '  File not found'
    //         });
    //     }
    //     bucket.openDownloadStream(files[0]._id).pipe(res);
    //     console.log(res)
    //     res.json(result);
    // });
    // const item = res.locals.item;
    // console.log(result);

});

router.delete('/:id', preload(), isOwner(), async (req, res) => {
    try {
        const itemId = req.params.id;
        await api.deleteById(itemId);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

module.exports = router;