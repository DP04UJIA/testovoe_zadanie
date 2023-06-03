const config = require("config");
const express = require("express");
const index = express();
const sequelize = require("./db/sequelize");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const swaggerFile = JSON.parse(fs.readFileSync("./swagger/swagger.json"));

index.use(bodyParser.json());
index.use("/user", userRouter);
index.use("/post", postRouter);
index.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

index.listen(config.get("server.port"), () => {
	console.log("Сервер запущен");
	sequelize
		.authenticate()
		.then(async () => {
			await sequelize.sync({ alter: true });
		})
		.catch((e) => console.log(e));
});
