const userService = require("../services/userServices");

const getUserList = async (req, res) => {
  try {
    const listUser = await userService.getAllUsers();
    res.send(listUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const authenticate = async (req, res) => {
  try {
    const requestBody = req.body;
    const success = await userService.createUser(requestBody);

    res.status(200).json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// const getUserByPhone = async (req, res) => {
//   try {
//     const { phoneNumber } = req.query;
//     const foundUser = await userService.getUserByPhone(phoneNumber);
//     res.send(foundUser);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

module.exports = {
  getUserList,
  authenticate,
};
