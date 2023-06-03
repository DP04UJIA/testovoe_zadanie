const path = require("path");
const fs = require("fs");

const deleteMedia = (medias) => {
	medias.forEach((file) => {
		const pathFile = path.join(file.destination, file.filename);
		fs.unlink(pathFile + "." + file.type, async (error) => {
			if (error) {
				console.log(error);
				return res.json({ error: "Произошла ошибка" });
			}
			await file.destroy();
		});
	});
};

module.exports = deleteMedia;
