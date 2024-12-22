const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getuser = require('../middleware/getuser');
const nodemailer = require('nodemailer');

router.post('/createnewuser', [
    body('name', 'Enter a valid name'),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "User already exists. Please login or use a different email." });
        } else {
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            });
            const data = { user: { id: user.id } }
            const authtoken = jwt.sign(data, "thisismysercretcode.");
            res.json({ message: "User created successfully", authtoken });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error. Please try again later." });
    }
});

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password. Please try again." });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Invalid email or password. Please try again." });
        }
        const data = { user: { id: user.id } }
        const authtoken = jwt.sign(data, "thisismysercretcode.");
        res.json({ message: "Login successful", authtoken });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Server error. Please try again later." });
    }
});

router.post('/getuser', getuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.json({ message: "User data fetched successfully", user });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Server error. Please try again later." });
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ramanikeval30@gmail.com',
        pass: 'tzvtdpcdfcatfdgc',
    }
});

router.post('/forgotpassword', [body('email', 'Enter a valid email').isEmail()], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found. Please check your email address.' });
        }

        const resetToken = jwt.sign({ id: user._id }, 'thisismysercretcode.', { expiresIn: '1h' });
        const resetLink = `http://localhost:3000/resetpassword/${resetToken}`;

        const mailOptions = {
            from: 'ramanikeval30@gmail.com',
            to: user.email,
            subject: 'Password Reset Request',
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset - Quick Notes</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f7fa;
      margin: 0;
      padding: 0;
    }

    .email-container {
      background-color: #ffffff;
      border-radius: 8px;
      padding: 30px;
      margin: 40px auto;
      max-width: 600px;
      width: 100%;
    }

    .header-logo {
      font-size: 30px;
      color: #007bff;
      text-align: center;
    }

    .header-logo img {
      width: 40px;  /* Adjust the size of the logo as per your design */
      height: auto;
      margin-right: 10px;
    }

    .btn-reset {
      background-color: #007bff;
      color: #ffffff;
      border: none;
      padding: 12px 25px;
      font-size: 16px;
      border-radius: 5px;
      text-decoration: none;
      display: inline-block;
    }

    .btn-reset:hover {
      background-color: #0056b3;
      color: white;
      text-decoration: none;
    }

    .footer-text {
      font-size: 14px;
      color: #6c757d;
      text-align: center;
      margin-top: 20px;
    }

    .footer-text a {
      color: #007bff;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header-logo">
      <!-- Use a logo image here -->
      <img src="https://i.ibb.co/Lr8TKRT/journals.png" alt="journals" border="0" height="25px">
      Quick Notes
    </div>
    <h2 style="text-align: center; margin-bottom: 20px;">Password Reset Request</h2>
    <p>Hello ${user.name},</p>
    <p>We received a request to reset your password for your Quick Notes account. If you didn’t request a password reset, you can ignore this email. Otherwise, click the button below to reset your password:</p>
    <div style="text-align: center; margin-bottom: 20px;">
      <a href="${resetLink}" class="btn-reset">Reset Your Password</a>
    </div>
    <p>If you have any questions or need further assistance, please contact our support team at <a href="mailto:ramanikeval30@gmail.com">support@quicknotes.com</a>.</p>
    <p>Thanks, <br>The Quick Notes Team</p>

    <div class="footer-text">
      <p>If you did not request a password reset, please ignore this email or contact support.</p>
      <p>&copy; 2024 Quick Notes. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: 'Failed to send email. Please try again later.' });
            }
            res.json({ message: "Password reset link has been sent to your email." });
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
});

router.post('/resetpassword/:token', [
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { password } = req.body;
        const { token } = req.params;

        const decoded = jwt.verify(token, 'thisismysercretcode.');

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found. Please try again.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password has been successfully updated.' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: "Server error. Please try again later." });
    }
});


router.post('/updateuser', getuser, async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.user.id;

    try {
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        if (name) user.name = name || user.name;
        if (email) user.email = email || user.email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(password, salt);
            user.password = secPassword || user.password
        }
        console.log(user.name);
        
        await user.save();

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

module.exports = router;
