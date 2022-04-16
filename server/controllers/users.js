const router = require('express').Router();
const auth = require('../middlewares/auth');
const { isGuest } = require('../middlewares/guards');
const User = require('../models/User');
const { register, login, logout } = require('../services/users');
const mapErrors = require('../utils/mapper');


router.post('/register', isGuest(), async (req, res) => {
    try {
        if (req.body.password.trim() == '' || req.body.email.trim() == '') {
            throw new Error('Email and password are required');
        }

        const result = await register(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.status(201).json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        const result = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.json(result);
    } catch (err) {
        console.error(err.message);
        const error = mapErrors(err);
        res.status(400).json({ message: error });
    }
});

router.get('/logout', (req, res) => {
    logout(req.user?.token);
    res.status(204).end();
});

router.post('/playlist', auth(), async (req, res) => {
    const user = await User.findById(req.user._id);
    user.playlist.push(req.body._id);
    await user.save();
    return res.status(201).json(user);
    // console.log(req.body);
});
router.post('/inPlaylist', auth(), async (req, res) => {
    const user = await User.findById(req.user._id);
    
    return user.playlist.includes(req.body._id);
});

module.exports = router;