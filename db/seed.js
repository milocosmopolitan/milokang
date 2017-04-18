const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'Administrator', email: 'admin@example.com', password: '1234'},
  {name: 'Guest', email: 'guest@example.gov', password: '1234'},
], user => db.model('users').create(user))


const seedPosts = () => db.Promise.map(require('./seed/post.seed'), post => db.model('posts').create(post)),
			seedPostMedia = () => db.Promise.map(require('./seed/post-media.seed'), media => db.model('posts-media').create(media)),
			seedPostLink = () => db.Promise.map(require('./seed/post-link.seed'), link => db.model('posts-link').create(link))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedPosts)
  .then(posts => console.log(`Seeded ${posts.length} posts OK`))
  .then(seedPostMedia)
  .then(media => console.log(`Seeded ${media.length} media OK`))
  .then(seedPostLink)
  .then(media => console.log(`Seeded ${media.length} link OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
