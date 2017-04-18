'use strict';

const Sequelize = require('sequelize');
const db = require('APP/db');

const PostLink = db.define('posts-link', {
	title: Sequelize.STRING,
	url: Sequelize.STRING,	
},{
	indexes: [{
		fields: ['url'],
		unique: true
	}]
})

module.exports = PostLink;