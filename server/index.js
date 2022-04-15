const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const {
    GridFsStorage
  } = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const cors = require('./middlewares/cors');
const catalogController = require('./controllers/catalog');
const usersController = require('./controllers/users');
const auth = require('./middlewares/auth');
const {Item} = require('./models/Item');

require('dotenv')
    .config();


start();


async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017/audioplayer', {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database ready');
    } catch (err) {
        console.error('Database connection failed');
        process.exit(1);
    }
    
    let bucket;
    mongoose.connection.on('connected', () => {
        var db = mongoose.connections[0].db;
        bucket = new mongoose.mongo.GridFSBucket(db, {
            bucketName: 'newBucket'
        });
        console.log('bucket created');
    });

    // mongoose.model('FileMeta', new mongoose.Schema({}, {
    //     collection: 'uploads.files',
    // }));
    
    const app = express();

    //creating bucket
    

    app.use(bodyParser.json());
    app.use(methodOverride('_method'));
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');


    

    app.use(express.json());
    app.use(cors());
    app.use(auth());
    app.use('/data/catalog', catalogController);
    app.use('/users', usersController);

    app.get('/', (req, res) => res.json({ message: 'REST service operational'}));

    app.listen(3030, () => console.log('REST service started on port 3030'));
    
}