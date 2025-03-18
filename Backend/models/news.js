const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: false },
  link: { type: String, required: true },
});

module.exports = mongoose.model('News', newsSchema);
