const db = require("../../config/db");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  try {
    const [user] = await db.promise().execute("SELECT * FROM users WHERE user_email = ?", [email]);

    if (user.length === 0) {
      return res.status(404).json({ error: "No user with that email found" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    // Store token in reset_password table
    await db
      .promise()
      .execute("INSERT INTO `reset-password` (user_email, token) VALUES (?, ?)", [email, token]);

    // Send reset email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "vishal.codecraft@gmail.com",
        pass: "jpenuxvrujxeldsf",
      },
    });

    const resetLink = `http://localhost:3000/authentication/reset-password/cover/ResetPassword?token=${token}&email=${email}`;

    await transporter.sendMail({
      from: "Business Management <vishal.codecraft@gmail.com>",
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({ message: "Reset link sent to email" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
