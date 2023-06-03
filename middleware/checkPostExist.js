const Post = require("../db/Post");

const checkPostExist = async (req, res, next) => {
	const postId = req.params.postId;
	const post = await Post.findByPk(postId);
	if (!post) return res.json({ error: "Такого поста нет" });
	req.post = post;
	next();
};

module.exports = checkPostExist;
