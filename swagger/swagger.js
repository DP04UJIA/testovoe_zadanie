const swaggerAutogen = require("swagger-autogen");

const doc = {
	info: {
		title: "API Doc",
		description: "API для тестового задания",
	},
	definitions: {
		user: {
			login: "login",
			password: "qwerty",
		},
		file: {
			fieldname: "media",
			originalname: "Изображение.png",
			encoding: "7bit",
			mimetype: "image/png",
			size: "1000",
			destination: "static\\image",
			filename: "dcb54c83-7640-4ad4-aaa3-35045c240e51",
			path: "static\\image\\dcb54c83-7640-4ad4-aaa3-35045c240e51",
		},
		files: [
			{
				$ref: "#/definitions/file",
			},
		],
		media: {
			fieldname: "dcb54c83-7640-4ad4-aaa3-35045c240e51",
			destination: "static\\image",
			type: "png",
		},
		medias: [{ $ref: "#/definitions/media" }],
		post: {
			date: "2023-01-01T00:00:01.001Z",
			text: "text",
			medias: { $ref: "#/definitions/medias" },
		},
		posts: [
			{
				$ref: "#/definitions/post",
			},
		],
	},
	securityDefinitions: {
		apiKeyAuth: {
			type: "apiKey",
			in: "header",
			name: "Authorization",
			description: "Bearer token",
		},
	},
	host: "localhost:3000",
	schemes: ["http"],
};

module.exports = doc;

swaggerAutogen("./swagger.json", ["../index.js"], doc);
