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

router.get('/', async (req, res) => {
    try {
        let data = await api.getAll();
        if (req.user) {
            const user = await User.findById(req.user._id);
            data = data.map(item => Object.assign({}, item, { isAdded: user.playlist.includes(item._id) }));
        } else {
            data = data.map(item => Object.assign({}, item, { isAdded: false }));
        }

        // console.log('data start' +JSON.stringify(data[0])+ 'data end');	
        res.json(data);
    } catch (err) {
        console.error(err);
    }

});

router.get('/playlist', async (req, res) => {
    try {
        let data = await api.getAll();
        const user = await User.findById(req.user._id);
        let result = [];
        data.forEach(item => {
            if (user.playlist.includes(item._id)) {
                result.push(Object.assign({}, item));
            }
        });
        // console.log('result start' +JSON.stringify(result[0]) + 'result end');
        res.json(result);
    } catch (err) {
        console.error('get playlist error' + err);
    }

    
});


router.post('/', isAuth(), upload.single('file'), async (req, res) => {
    const item = {
        name: req.body.name,
        artist: req.body.artist,
        file: req.file.id,
        ownerId: req.user._id
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

router.get('/item/:id', preload(), async (req, res) => {
    const item = res.locals.item;
    res.json(item);
});

router.patch('/item/:id', preload(), isOwner(), async (req, res) => {
    const itemId = req.params.id;
    const item = {
        artist: req.body.artist,
        name: req.body.name
    };

    try {
        const result = await api.update(itemId, item);
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});
router.delete('/item/:id', preload(), isOwner(), async (req, res) => {
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

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const file = await FilesMeta.findById(id);
    console.log(file);

    const db = mongoose.connection;
    let bucket;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'uploads'
    });

    try {
        bucket.openDownloadStream(mongoose.Types.ObjectId(file._doc._id)).pipe(res);

    } catch (err) {
        console.log('bucket');
        console.error(err);
    }
});



module.exports = router;