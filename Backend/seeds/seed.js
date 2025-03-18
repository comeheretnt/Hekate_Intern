const mongoose = require("mongoose");
const xlsx = require("xlsx");
const { v4: uuidv4 } = require("uuid");
const News = require("../models/news");
const User = require("../models/user"); 
const connectDB = require("../config/database");
const moment = require("moment");

connectDB();

const seedNews = async () => {
    try {
        await News.deleteMany({});
        console.log("Xóa dữ liệu cũ thành công!");

        const workbook = xlsx.readFile("./data/AI_news_articles.xlsx");
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

        console.log("Data convert file Excel:", data);

        const newsData = data.map((row, index) => {
            let formattedDate;
            if (typeof row.date === "number") {
                const excelEpoch = new Date(1900, 0, 1); 
                formattedDate = moment(
                    new Date(excelEpoch.getTime() + (row.date - 2) * 24 * 60 * 60 * 1000)
                ).format("DD/MM/YYYY"); // 
            } else if (typeof row.date === "string") {
                formattedDate = moment(row.date, ["DD/MM/YYYY", "YYYY/MM/DD", "MM/DD/YYYY"]).format("DD/MM/YYYY");
            } else {
                formattedDate = moment(new Date()).format("DD/MM/YYYY");
            }

            return {
                id: uuidv4(),
                title: row.title || "Không có tiêu đề",
                date: formattedDate, 
                content: row.content || "Không có nội dung",
                description: row.description || row.content || "Không có mô tả",
                image_url: row.image_url && row.image_url.trim() !== "" 
                    ? row.image_url 
                    : "https://placehold.co/150", 
                link: row.link || "#",
            };
        });

        await News.insertMany(newsData);
        console.log("Seed News thành công!");
    } catch (error) {
        console.error("Seed News error:", error);
    }
};

const seedUser = async () => {
    try {
        const existingUser = await User.findOne({ email: "user@example.com" });
        if (existingUser) {
            console.log("Tài khoản mặc định đã tồn tại, bỏ qua.");
            return;
        }

        const user = new User({
            name: "Admin User",
            email: "user@example.com",
            password: "User@1234",
        });

        await user.save();
        console.log("Seed user mặc định thành công!");
    } catch (error) {
        console.error("Lỗi khi seed user:", error);
    }
};

const seedDatabase = async () => {
    try {
        await seedNews(); 
        await seedUser(); 
        console.log("Seed database thành công!");
    } catch (error) {
        console.error("Lỗi khi seed database:", error);
    } finally {
        mongoose.connection.close(); 
    }
};

seedDatabase();