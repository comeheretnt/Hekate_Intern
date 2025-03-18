const News = require('../models/news');

exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    console.log("Fetched News:", news); 
    res.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createNews = async (req, res) => {
  try {
    const { id, title, date, content, description, image_url, link } = req.body;
    const newNews = new News({ id, title, date, content, description, image_url, link });
    
    await newNews.save();
    res.status(201).json({ message: "News created successfully", data: newNews });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
