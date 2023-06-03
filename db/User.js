const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Post = require("./Post");

const User = sequelize.define(
	"Users",
	{
		login: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
	},
	{}
);

User.hasMany(Post);
Post.belongsTo(User);

module.exports = User;
