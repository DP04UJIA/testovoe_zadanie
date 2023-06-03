const postController = require("../controllers/postController");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/multer/upload");
const checkAuthorPost = require("../middleware/checkAuthorPost");
const checkPostExist = require("../middleware/checkPostExist");

const postRouter = require("express").Router();

postRouter.post("/addPost", [verifyToken, upload.array("media", 5)], postController.addPost);
postRouter.delete(
	"/deletePost/:postId",
	[verifyToken, checkPostExist, checkAuthorPost],
	postController.deletePost
);
postRouter.put(
	"/editPost/:postId",
	[verifyToken, checkPostExist, checkAuthorPost],
	postController.editPost
);
postRouter.get("/getPosts/:page", postController.getPosts);

module.exports = postRouter;
