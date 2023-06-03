const Media = require("../db/Media");

const addMedia = (files, postId) => {
	return Promise.all(
		files.map(
			async (file) =>
				await Media.create({
					destination: file.destination,
					filename: file.filename.split(".")[0],
					type: file.mimetype.split("/")[1],
					size: file.size,
					PostId: postId,
				})
		)
	);
};

module.exports = addMedia;
