'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const PostMedia = db.define('posts-media', {
	alt: Sequelize.STRING,
	url: Sequelize.STRING,
	type: Sequelize.STRING,
	sort: Sequelize.INTEGER,
},{
	indexes: [{
		fields: ['url'], 
		unique: true
	}],
	defaultScope: {
		order: ['posts_id', 'sort']
	}
})

module.exports = PostMedia;