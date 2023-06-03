const bcrypt = require("bcryptjs");
const User = require("../db/User");
const jwtSign = require("../utils/jwtSign");

const userController = {
	registration: async (req, res) => {
		/* 
        #swagger.tags = ['User']
        #swagger.description = 'Регистрация нового пользователя'
            #swagger.responses[200] = {
            description: 'Регистрация выполнена',
        } */
		try {
			const { login, password } = req.body;
			if (req.user) return res.json({ error: "Такой пользователь уже существует" });
			const hashPassword = bcrypt.hashSync(password, 8);
			const newUser = await User.create({ login, password: hashPassword });
			const accessToken = jwtSign(newUser.id);
			return res
				.set("Authorization", "Bearer " + accessToken)
				.json({ message: "Регистрация прошла успешно" });
		} catch (err) {
			console.log(err);
		}
	},
	authorization: async (req, res) => {
		/* 
        #swagger.tags = ['User']
        #swagger.description = 'Авторизация пользователя'
            #swagger.responses[200] = {
            description: 'Авторизация выполнена',
        } */
		try {
			const { login, password } = req.body;
			if (!req.user) return res.json({ error: "Неправильный логин или пароль" });
			const user = await User.findOne({ where: { login } });
			const checkPass = bcrypt.compareSync(password, user.password);
			if (!checkPass) return res.json({ error: "Неправильный логин или пароль" });
			const accessToken = jwtSign(user.id);
			return res
				.set("Authorization", "Bearer " + accessToken)
				.json({ message: "Авторизация прошла успешно" });
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = userController;
