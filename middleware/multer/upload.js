const multer = require("multer");
const storage = require("./storage");

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		const mimeType = ["image", "application", "audio", "video"];
		const mimeTypeFile = file.mimetype.split("/")[0];
		if (mimeType.includes(mimeTypeFile)) {
			cb(null, true);
		} else {
			cb(null, false);
		}
	},
});

module.exports = upload;
