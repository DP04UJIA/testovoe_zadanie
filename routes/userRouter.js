const userController = require("../controllers/userController");
const findUser = require("../middleware/findUser");

const userRouter = require("express").Router();

userRouter.post("/registration", findUser, userController.registration);
userRouter.post("/authorization", findUser, userController.authorization);

module.exports = userRouter;
