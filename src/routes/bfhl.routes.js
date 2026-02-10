const express = require('express');
const router = express.Router();
const bfhlController = require('../controllers/bfhl.controller');

router.get('/', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

router.post('/', bfhlController.handleBfhl);

module.exports = router;
