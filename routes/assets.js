const express = require('express');
const router = express.Router();
const assetsHandler = require('../handlers/assets');

router.get('/', assetsHandler.getAll);
router.post('/upload', assetsHandler.upload);
router.delete('/delete/:id', assetsHandler.destroy);

module.exports = router;
