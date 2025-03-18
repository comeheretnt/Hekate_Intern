const express = require('express');
const router = express.Router();


const authRoutes = require('./auth.routes');
const newsRoutes = require('./news.routes');


router.use('/api/auth', authRoutes);
router.use('/news', newsRoutes);

module.exports = router;