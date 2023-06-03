const { DataTypes } = require("sequelize");
const sequelize = require("./sequelize");

const Media = sequelize.define(
	"Medias",
	{
		destination: {
			type: DataTypes.STRING,
		},
		filename: {
			type: DataTypes.UUID,
		},
		type: {
			type: DataTypes.STRING,
		},
		size: {
			type: DataTypes.INTEGER,
		},
	},
	{}
);

module.exports = Media;
