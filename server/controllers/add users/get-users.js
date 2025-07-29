const db = require("../../config/db");

exports.getUsers = (req, res) => {
  const query = `
    SELECT user_id, user_name, user_email, user_phone, user_role, user_address 
    FROM users 
    WHERE user_role != 1
  `;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Failed to fetch users" });
    }

    res.status(200).json(results);
  });
};
