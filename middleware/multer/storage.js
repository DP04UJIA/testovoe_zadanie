const multer = require("multer");
const uuid = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const mimeType = file.mimetype.split("/")[0];
		const pathFile = path.join("static", mimeType);
		cb(null, pathFile);
	},
	filename: (req, file, cb) => {
		const typeFile = file.mimetype.split("/")[1];
		cb(null, uuid.v4() + "." + typeFile);
	},
});

module.exports = storage;
