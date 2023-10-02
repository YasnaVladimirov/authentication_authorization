const models = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized access!" })
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await models.User.findOne({ where: { refreshToken } });
    if (!foundUser) return res.status(401).json({ message: "Unauthorized access, User not found!" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || foundUser.username !== decoded.UserInfo?.username) return res.status(403).json({err});
        
        const roles = await foundUser.getRoles();
        const roleCodesArray = roles.map(role => role.code);

        const newAccessToken = jwt.sign({
          "UserInfo": {
            "username": decoded.UserInfo.username,
            "roles": roleCodesArray
          }
        },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '10s' }
        );

        res.status(200).json({ roleCodesArray, newAccessToken });
      }
    )
  } catch (error) {
    res.sendStatus(500);
    console.log("Error: ", error);
  }
}

module.exports = {
  handleRefreshToken
}