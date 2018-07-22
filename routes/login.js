const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../public/javascripts/verifyToken')
const router = express.Router();

router.get('/', (req, res) => {
    const user = {
        id: 1,
        name: 'Brad',
        email: 'brad@gmail.com'
    };

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({ token});
    });
});

router.post('/api', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                ok: 'good',
                authData
            });
        }
    });
});

module.exports = router;