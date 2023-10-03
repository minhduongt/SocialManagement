const { usersRef } = require("../firebase/config");

const getAllUsers = async () => {
  let listUser = [];
  const snapshot = await usersRef.get();
  listUser = snapshot.docs.map((doc) => doc.data);

  return listUser;
};

const getUserByPhone = async (phoneNumber) => {
  const user = (await usersRef.doc(phoneNumber).get()).data();
  return user;
};

const createUser = async (requestBody) => {
  const { phoneNumber } = requestBody;
  const otpCode = Math.floor(100000 + Math.random() * 900000);

  const newUser = {
    phoneNumber: phoneNumber,
    isValidated: false,
    accessCode: otpCode,
  };
  await usersRef.doc(phoneNumber).set(newUser);
};

const updateUser = async () => {};

const deleteUser = async () => {};

module.exports = {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByPhone,
  updateUser,
};
