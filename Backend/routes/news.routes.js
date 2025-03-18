const express = require('express');
const router = express.Router();
const { getAllNews, createNews } = require('../controllers/news.controller');

router.get('/getAllNews', getAllNews);
router.post('/', createNews);

module.exports = router;