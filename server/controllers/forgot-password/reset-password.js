const db = require("../../config/db");
const md5 = require("md5");

exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;

  try {
    const [rows] = await db
      .promise()
      .execute("SELECT * FROM `reset-password` WHERE user_email = ? AND token = ?", [email, token]);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    await db
      .promise()
      .execute("UPDATE users SET user_password = ? WHERE user_email = ?", [md5(newPassword), email]);

    await db.promise().execute("DELETE FROM `reset-password` WHERE user_email = ?", [email]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
