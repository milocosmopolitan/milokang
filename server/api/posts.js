'use strict'
const db = require('APP/db')
const Post = db.model('posts')

module.exports = require('express').Router()
	.param('postId', (req, res, next, id) => {
		Post.findById(id)
			.then(post => {
				if(!post) throw Error(404);
				req.post = post;
				next();
			})
			.catch(next);
	})
	.get('/', (req, res, next) => 
		Post.findAll()
			.then(posts => res.json(posts))
			.catch(next))
	.post('/', (req, res, next) =>
		Post.create(req.body)
			.then(post => res.status(201).json(post))
			.catch(next))
	.put('/:postId', (req, res, next) =>
		req.post.update(req.body)
			.then(post => post.reload())
			.then(post => res.status(201).json(post))
			.catch(next))
	.delete('/:postId', (req, res, next) => {
		req.post.destroy()
			.then(function () {
		    res.status(204).end();
		  })
		  .catch(next);
	})
	.get('/:postId', (req, res, next) => 
		res.json(req.post))
