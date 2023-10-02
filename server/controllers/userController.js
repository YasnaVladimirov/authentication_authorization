const models = require("../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await models.User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: `Error getting all users, ${error}` });
    console.log("Error getting all users", error);
  }
}

const getUser = async (req, res) => { 
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json("User id required!");
    const user = await models.User.findOne({ where: { id } });
    if (!user) res.status(400).json("User not found!");
    res.status(200).json({
      id: user.id,
      username: user.username
    });
  } catch (error) {
    res.status(500).json({ error: `Error fetching user, ${error}`});
    console.log("Error getting user", error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json("User id required!");
    const result = await models.User.destroy({ where: { id } });
    res.status(200).json("User deleted successfully!" + result);
  } catch (error) {
    res.status(500).json({ error: `Error deleting user, ${error}` });
    console.log("Error deleting user", error);
  }
}

module.exports = {
  getAllUsers,
  getUser,
  deleteUser
}