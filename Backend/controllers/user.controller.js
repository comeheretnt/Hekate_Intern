const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const transport = require('../config/email');
const crypto = require('crypto');
require('dotenv').config();

const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// exports.register = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({ message: "Name, email, and password are required." });
//         }

//         if (!emailValidation.test(email)) {
//             return res.status(400).json({ message: "Invalid email format." });
//         }

//         if (!passwordValidation.test(password)) {
//             return res.status(400).json({
//                 message: "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character."
//             });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists." });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10); // Hash mật khẩu trước khi lưu
//         const newUser = new User({ name, email, password: hashedPassword });

//         await newUser.save();
//         res.status(201).json({ message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received email:", email);
        console.log("Entered password:", password);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(400).json({ message: "Invalid credentials" });
        }

        console.log("User found in DB:", user);
        console.log("Stored hashed password:", user.password);

        if (!password) {
            console.log("No password provided!");
            return res.status(400).json({ message: "Password is required" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password comparison result:", isMatch);

        if (!isMatch) {
            console.log("Password does not match");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });


        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; 
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;


        await transport.sendMail({
            to: user.email,
            from: process.env.EMAIL_USER,
            subject: "Reset Your Password",
            html: `<p>Click the link below to reset your password:</p>
                   <a href="${resetUrl}" target="_blank">${resetUrl}</a>
                   <p>If you didn’t request this, you can safely ignore this email.</p>`,
        });

        res.json({ message: "Reset password email sent" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ message: 'Password is required.' });
        }

        if (!passwordValidation.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.'
            });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        console.log("Saved hashed password:", user.password);

        res.status(200).json({ message: 'Password has been reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};

