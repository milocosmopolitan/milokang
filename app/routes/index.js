import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Home from './Home/home';
import Root from './Root/root';
import Admin from './Admin/admin';
import Dashboard from './Dashboard/dashboard';
import Posts from './Posts';


import { fetchPosts } from '../reducers/posts';
import { whoami } from '../reducers/auth';

/* -----------------    COMPONENT     ------------------ */

const Routes = (props) => (
  <Router history={browserHistory}>
    <Route path="/" component={Root} onEnter={props.initializeData}>
      <IndexRoute component={Home} />
    </Route>
    <Route path="/admin" component={Admin} onEnter={props.initializeData}>
      <Route path="/admin/dashboard" component={Dashboard} />
      <Route path="/admin/posts" component={Posts.Container}>        
        <Route path="/admin/posts/:id/edit" component={Posts.Form} />
        <Route path="/admin/posts/add" component={Posts.Form} />
        <IndexRoute component={Posts.List} />
      </Route>
      <IndexRoute component={Dashboard} />    
    </Route>
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

const mapProps = null;
const mapDispatch = dispatch => {
  return {
    initializeData: () => {      
      dispatch(fetchPosts());
      dispatch(whoami());
    }
  }
};

export default connect(mapProps, mapDispatch)(Routes);
