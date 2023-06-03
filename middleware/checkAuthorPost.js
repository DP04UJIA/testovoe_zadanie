const checkAuthorPost = async (req, res, next) => {
	const userId = req.userId;
	const post = req.post;
	if (userId !== post.UserId) return res.json({ error: "У вас нет прав на изменение этого поста" });
	next();
};

module.exports = checkAuthorPost;
