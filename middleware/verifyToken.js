const jwt = require("jsonwebtoken");
const config = require("config");

const verifyToken = async (req, res, next) => {
	const bearerToken = req.headers.authorization;
	if (bearerToken) {
		const accessToken = bearerToken.split(" ")[1];
		jwt.verify(accessToken, config.get("jwt.key"), (error, decoded) => {
			if (error) {
				console.log(error);
				return res.json({ error: "Произошла ошибка" });
			}
			req.userId = decoded.id;
			next();
		});
	} else {
		return res.json({ error: "Пользователь неавторизирован" });
	}
};

module.exports = verifyToken;
