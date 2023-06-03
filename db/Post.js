const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");
const Media = require("./Media");

const Post = sequelize.define(
	"Posts",
	{
		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
		text: {
			type: DataTypes.STRING,
		},
	},
	{}
);

Post.hasMany(Media);
Media.belongsTo(Post);

module.exports = Post;
