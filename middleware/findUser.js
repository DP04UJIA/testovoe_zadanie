const User = require("../db/User");

const findUser = async (req, res, next) => {
	const { login } = req.body;
	const user = await User.findOne({ where: { login } });
	user ? (req.user = true) : (req.user = false);
	next();
};

module.exports = findUser;
