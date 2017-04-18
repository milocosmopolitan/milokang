import axios from 'axios';

const INITIALIZE = 'INITIALIZE_POSTS';
const CREATE     = 'CREATE_POST';
const REMOVE     = 'REMOVE_POST';
const UPDATE     = 'UPDATE_POST';

const init   = posts => ({ type: INITIALIZE, posts });
const create = post   => ({ type: CREATE, post });
const remove = id      => ({ type: REMOVE, id });
const update = post   => ({ type: UPDATE, post });

export default function reducer (posts = [], action) {
  switch (action.type) {

    case INITIALIZE:
      return action.posts;

    case CREATE:
      return [action.post, ...posts];

    case REMOVE:
      return posts
        .filter(post => post.id !== action.id);

    case UPDATE:
      return posts
        .map(post => (
          action.post.id === post.id ? action.post : post
        ));

    default:
      return posts;
  }
}

export const fetchPosts = () => dispatch => {
    axios.get('/api/posts')
         .then(res => dispatch(init(res.data)))
         .catch(err => console.error('Fetching posts unsuccesful', err));
};

export const removePost = id => dispatch => {
    dispatch(remove(id));
    axios.delete(`/api/posts/${id}`)
         .catch(err => console.error(`Removing post: ${id} unsuccesful`, err));
};

export const addPost = post => dispatch => {
    axios.post('/api/posts', post)
         .then(res => dispatch(create(res.data)))
         .catch(err => console.error(`Creating post: ${post} unsuccesful`, err));
};

export const updatePost = (id, post) => dispatch => {
    axios.put(`/api/posts/${id}`, post)
         .then(res => dispatch(update(res.data)))
         .catch(err => console.error(`Updating post: ${post} unsuccesful`, err));
};
