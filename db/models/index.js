'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const OAuth = require('./oauth');

const Post = require('./post');
const PostMedia = require('./post-media');
const PostLink = require('./post-link');

OAuth.belongsTo(User);
User.hasOne(OAuth);

PostMedia.belongsTo(Post);
Post.hasMany(PostMedia, {as: 'media'});

PostLink.belongsTo(Post);
Post.hasMany(PostLink, {as: 'links'});

module.exports = {
	User, Post, PostMedia, PostLink
};
