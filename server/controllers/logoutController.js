const models = require("../models");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(400).json({ message: "Cookie not found."});

  const refreshToken = cookies.jwt;

  try {
    const foundUser = await models.User.findOne({ where: { refreshToken } });
    
    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: 'None',
        secure: true
      });
      return res.sendStatus(204);
    }

    await models.User.update({ refreshToken: null }, { where: { refreshToken: foundUser.refreshToken } });
    
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: 'None',
      secure: true
    });
    return res.status(200).json({ message: "Logout successfully!"});
  } catch (error) {
    res.status(500).json({ error: "Failed logging out user, " + error });
    console.log("Error: ", error);
  }
}

module.exports = {
  handleLogout
}