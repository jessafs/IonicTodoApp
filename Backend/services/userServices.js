const accountsModel = require("../models/accountsModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET = "secret";
exports.register = async (user) => {
  try {
    let createUser = new accountsModel(user);
    let saved = await createUser.save();
    return { error: false, data: saved, msg: "Successfully inserted" };
  } catch (error) {
    return { error: true, data: error, msg: error.message };
  }
};
exports.login = async (username, password) => {
  try {
    let user = await accountsModel.findOne({ username });
    if (user === null) {
      return { error: true, code: 404, msg: "Not Found" };
    }
    let match = await bcrypt.compare(password, user?.password);
    if (match) {
      const token = jwt.sign({ id: user._id, username: user.username }, SECRET);
      return { error: false, data: user, token: token, msg: "Success" };
    } else {
      return { error: true, code: 401, msg: "Incorect password" };
    }
  } catch (error) {
    return { error: true, data: error, msg: error.message };
  }
};
