const db = require("../../config/db");

exports.logout = async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    })
    .status(200)
    .json({ message: "Logout successful" });
};
