const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5002;

connectDB();

app.use(cors());
app.use(express.json());

app.use(require('./routes/index'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});