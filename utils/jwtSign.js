const jwt = require("jsonwebtoken");
const config = require("config");

const jwtSign = (id) => {
	const accessToken = jwt.sign({ id }, config.get("jwt.key"));
	return accessToken;
};

module.exports = jwtSign;
