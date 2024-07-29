const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(username, hashedPassword, email);
    res.status(200).json({
      status: "Account Successfully",
      created: "status_code: 200",
      user_id: user.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = uuidv4();
      res.status(400).json({
        status: "Login Successful",
        status_code: 200,
        user_id: user.id,
        access_token: accessToken,
      });
    } else {
      res.status(401).json({
        status: "Incorrect Username/password Provided. Please retry",
        status_code: 401,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "error Logging in" });
  }
};
