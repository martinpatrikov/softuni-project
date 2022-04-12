const router = require('express').Router();
const api = require('../services/furniture');
const { isAuth, isOwner } = require('../middlewares/guards');
const mapErrors = require('../utils/mapper');
const preload = require('../middlewares/preload');
const mongoose = require('mongoose');
const Item = require('../models/Item');
const multer = require('multer');
const {
    GridFsStorage
} = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


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


router.post('/upload', isAuth(), upload.single('file'), (req, res) => {
    console.log(req.body);
    const item = {
        name: req.body.name,
        artist: req.body.artist,
        file: req.file.id
    };
    api.create(item);

    // console.log(req.file);
    res.redirect('/');
});

// router.post('/', isAuth(), async (req, res) => {
//     const item = {
//         make: req.body.make,
//         model: req.body.model,
//         year: req.body.year,
//         description: req.body.description,
//         price: req.body.price,
//         img: req.body.img,
//         material: req.body.material,
//         owner: req.user._id
//     };

//     try {
//         const result = await api.create(item);
//         res.status(201).json(result);
//     } catch (err) {
//         console.error(err.message);
//         const error = mapErrors(err);
//         res.status(400).json({ message: error });
//     }
// });

router.get('/:id', preload(), (req, res) => {
    const item = res.locals.item;
    res.json(item);
});

router.put('/:id', preload(), isOwner(), async (req, res) => {
    const itemId = req.params.id;
    const item = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        description: req.body.description,
        price: req.body.price,
        img: req.body.img,
        material: req.body.material
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