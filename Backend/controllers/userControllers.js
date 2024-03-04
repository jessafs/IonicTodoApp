const userService = require("../services/userServices");
const bcrypt = require("bcryptjs");
exports.registerUser = async (req, res) => {
  const data = req.body;
  if (data) {
    const password = await bcrypt.hash(data.password, 10);
    data.password = password;
    const user = await userService.register(data);
    console.log(user, "user");
    return res.json({ ...user });
  } else {
    return res.json({ error: true, msg: "Data is required" });
  }
};
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    const user = await userService.login(username, password);
    if (user.error) {
      return res.status(user.code).json({ msg: user.msg });
    }
    return res.json({ ...user });
  } else {
    return res.json({ error: true, msg: "Invalid username/password" });
  }
};
