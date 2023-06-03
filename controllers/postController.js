const Media = require("../db/Media");
const Post = require("../db/Post");
const addMedia = require("../utils/addMedia");
const deleteMedia = require("../utils/deleteMedia");
const config = require("config");

const postController = {
	addPost: async (req, res) => {
		/* 
        #swagger.tags = ['Post']
        #swagger.description = 'Добавление нового поста'
        #swagger.responses[200] = {
            description: 'Пост опубликован',
            schema: {message: "Пост опубликован"}
        }  
        #swagger.consumes = ['multipart/form-data'] 
        #swagger.parameters['media'] = {
                in: 'files',
                description: 'Медиа файлы для нового поста',
                schema: {$ref: "#/definitions/files"}
            }
        */
		try {
			const text = req.body.text;
			const files = req.files;
			console.log(files);
			const userId = req.userId;
			const post = await Post.create({ text, UserId: userId });
			await addMedia(files, post.id);
			return res.json({ message: "Пост опубликован" });
		} catch (err) {
			console.log(err);
		}
	},
	deletePost: async (req, res) => {
		/* 
        #swagger.tags = ['Post']
        #swagger.description = 'Удаление поста'
        #swagger.responses[200] = {
            description: 'Пост удалён со всеми медиа файлами',
            schema: {message: "Пост удалён"}
        }  
        #swagger.parameters['postId'] = {
                in: 'path',
                description: 'ID поста',
                required: true,
                schema: {
                    postId: 1
                }
            }
        */
		try {
			const post = req.post;
			const medias = await post.getMedias();
			deleteMedia(medias);
			await post.destroy();
			return res.json({ message: "Пост удалён" });
		} catch (err) {
			console.log(err);
		}
	},
	editPost: async (req, res) => {
		/*
        #swagger.tags = ['Post']
        #swagger.description = 'Изменение поста'
        #swagger.responses[200] = {
            description: 'Пост изменён',
            schema: {message: "Пост изменён"}
        }  
        #swagger.consumes = ['multipart/form-data'] 
        #swagger.parameters['media'] = {
                in: 'files',
                description: 'Медиа файлы для старого поста',
                schema: {$ref: "#/definitions/files"}
            }
        */
		try {
			const post = req.post;
			const text = req.body.text;
			const files = req.files;
			const medias = await post.getMedias();
			deleteMedia(medias);
			await addMedia(files, post.id);
			await post.update({ text, date: new Date() });
			return res.json({ message: "Пост изменён" });
		} catch (err) {
			console.log(err);
		}
	},
	getPosts: async (req, res) => {
		/*
        #swagger.tags = ['Post']
        #swagger.description = 'Получение постов'
        #swagger.responses[200] = {
            description: 'Получение постов с лимитом',
            schema: { $ref: '#/definitions/posts' }
        }  
        #swagger.consumes = ['multipart/form-data'] 
        #swagger.parameters['page'] = {
                in: 'path',
                description: 'Номер страницы',
                schema: {pageId: "1"}
            }
        */
		try {
			const page = Number(req.params.page);
			const pagination = {
				limit: page === 1 ? config.get("pagination.limit") * 2 : config.get("pagination.limit"),
				offset: page === 1 ? 0 : config.get("pagination.limit") * page,
			};
			const posts = await Post.findAll({
				order: [["date", "DESC"]],
				limit: pagination.limit,
				offset: pagination.offset,
				attributes: ["date", "text"],
				include: [{ model: Media, attributes: ["destination", "filename", "type"] }],
			});
			return res.json(posts);
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = postController;
