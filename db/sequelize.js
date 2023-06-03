const { Sequelize } = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(
	config.get("sequelize.database"),
	config.get("sequelize.username"),
	config.get("sequelize.password"),
	{
		host: config.get("sequelize.host"),
		dialect: config.get("sequelize.dialect"),
		define: {
			timestamps: false,
		},
	}
);

module.exports = sequelize;
