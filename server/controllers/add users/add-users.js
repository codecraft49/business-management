const db = require("../../config/db");
const md5 = require("md5");

exports.AddUsers = async (req, res) => {
  const { user_name, user_email, user_phone, user_role, user_address } = req.body;

  if (!user_name || !user_email || !user_phone || !user_role || !user_address) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const password = md5("user@123");
  const createdAt = new Date();
  const updatedAt = new Date();

  // Step 1: Check if email already exists
  const checkEmailQuery = "SELECT * FROM users WHERE user_email = ?";
  db.query(checkEmailQuery, [user_email], (emailErr, emailResults) => {
    if (emailErr) {
      return res.status(500).json({ message: "Server error", error: emailErr.sqlMessage });
    }

    if (emailResults.length > 0) {
      return res.status(409).json({ message: "Email already exists please use other email" });
    }

    // Step 2: Check if phone already exists
    const checkPhoneQuery = "SELECT * FROM users WHERE user_phone = ?";
    db.query(checkPhoneQuery, [user_phone], (phoneErr, phoneResults) => {
      if (phoneErr) {
        return res.status(500).json({ message: "Server error", error: phoneErr.sqlMessage });
      }

      if (phoneResults.length > 0) {
        return res.status(409).json({ message: "Phone number already exists please use other phone number" });
      }

      // Step 3: Insert new user
      const insertQuery = `
        INSERT INTO users 
        (user_name, user_email, user_phone, user_role, user_address, user_password, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      db.query(
        insertQuery,
        [
          user_name,
          user_email,
          user_phone,
          user_role,
          user_address,
          password,
          createdAt,
          updatedAt,
        ],
        (insertErr, result) => {
          if (insertErr) {
            return res.status(500).json({ message: "Server error", error: insertErr.sqlMessage });
          }

          res.status(201).json({ message: "User added successfully" });
        }
      );
    });
  });
};
