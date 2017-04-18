const request = require('supertest');
const {expect} = require('chai');
const db = require('APP/db');
const Post = require('APP/db/models/post');
const app = require('APP/server/start');

describe('/api/posts', () => {

  before('Await database sync', () => db.didSync);
  afterEach('Clear the tables', () => db.truncate({ cascade: true }));

  describe('POST', () => {
    it('creates a post', () =>
      request(app)
        .post('/api/posts')
        .send({
          title: 'Test Projects',
          subtitle: 'This is test project',
          slug: 'test',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          type: 'project',
          colors: {
            background:{
              r:18,
              g:26,
              b:24,
              a:0.8
            },
            font: '#EEEEEE',
            highlight: '#00ffd8'
          }
        })
        .expect(201)
    );

    it('redirects to the post it just made', () =>
      request(app)
        .post('/api/posts')
        .send({
          title: 'Test Projects2',
          subtitle: 'This is test project2',
          slug: 'test2',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          type: 'project',
          colors: {
            background:{
              r:18,
              g:26,
              b:24,
              a:0.8
            },
            font: '#EEEEEE',
            highlight: '#00ffd8'
          }
        })
        .redirects(1)
        .then(res => expect(res.body).to.contain({
          title: 'Test Projects2'
        }))
    );

  });
});
