const db = require("../../config/db");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userQuery = `
    SELECT * FROM users 
    WHERE user_email = ? OR user_name = ?
  `;

  db.query(userQuery, [emailOrUsername, emailOrUsername], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found with this email or username" });
    }

    const user = results[0];
    const hashedPassword = md5(password);

    if (user.user_password !== hashedPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        user_id: user.user_id,
        user_name: user.user_name,
        user_email: user.user_email,
        user_role: user.user_role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Send JWT in cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true, // Set to false if running on localhost without HTTPS
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "Login successful",
        user: {
          user_id: user.user_id,
          user_name: user.user_name,
          user_email: user.user_email,
          user_role: user.user_role,
        },
      });
  });
};
