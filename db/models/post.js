'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const PostMedia = require('./post-media');
const PostLink = require('./post-link');

const Post = db.define('posts', {
	title: Sequelize.STRING,
	subtitle: Sequelize.STRING,
	slug: {
		type: Sequelize.STRING,
		allowNull: false
	},
	description: Sequelize.TEXT,
	content: Sequelize.TEXT,
	type: Sequelize.ENUM('project', 'blog', 'component'),
	colors: Sequelize.JSON,
	technology: Sequelize.ARRAY(Sequelize.STRING)
},{
	indexes: [{
		fields: ['slug'], 
		unique: true
	}],
	defaultScope: {
		include: [
			{
				model: PostMedia,
				as: 'media'
			},{
				model: PostLink,
				as: 'links'
			}
		],
		order: [ 'media', 'media.sort' ],
	}
})

module.exports = Post;