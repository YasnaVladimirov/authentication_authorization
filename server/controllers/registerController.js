const bcrypt = require("bcryptjs");
const models = require("../models");
const { validationResult } = require("express-validator");

const handleRegister = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: "Invalid or missing data"});

  const existingUser = await models.User.findOne({where: {username}});
  if (existingUser) return res.status(400).json({ error: "User with these credentials already exists!"});
  
  try {
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await models.User.create({
      username: username,
      password: hashedPass
    });

    const userRole = await models.Role.findOne({ where: { role: 'User' } });

    if (userRole) {
      await newUser.addRole(userRole.id);
    } else {
      console.log("Warning: 'User' role not found in the Roles table.");
    }

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed creating user, " + error });
    console.log("Error: ", error);
  }
}

module.exports = {
  handleRegister
}