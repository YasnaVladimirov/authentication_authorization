const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const models = require("../models");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: "Invalid or missing data" });

  try {
    const foundUser = await models.User.findOne({ where: { username: username } });
    if(!foundUser) return res.status(400).json({ error: "User not found!" });

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) return res.status(400).json({ error: "Invalid password!" });

    if (match) {
      const userRoles = await foundUser.getRoles();

      if (userRoles) {
        const roles = userRoles.map(role => role.code)
        const accessToken = jwt.sign(
          {
            "UserInfo": {
              "username": foundUser.username,
              "roles": roles
            }
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '10s' }
        );
        const refreshToken = jwt.sign(
          {
            "UserInfo": {
              "username": foundUser.username,
              "roles": roles
            }
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );

        await models.User.update({ refreshToken }, { where: { id: foundUser.id } });

        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: 'None',
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({ message: "Login successfully", accessToken, roles });
      } else {
        console.log("Warning: 'User' role not found in the Roles table.");
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Failed logging user, " + error });
    console.log("Error: ", error);
  }
}

module.exports = {
  handleLogin
}