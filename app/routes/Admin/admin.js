import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login } from 'APP/app/components';
import { Link } from 'react-router';

require('./admin.stylesheet.scss');
const AdminComponent = (props) => {


	if(props.auth) {
		return (
			<div id="admin">
				<div className="sidebar">
					<div><Link to={'/'}>Client</Link></div>
					<div><Link to={'/admin'}>Dashboard</Link></div>
					<div><Link to={'/admin/posts'}>Post</Link></div>
				</div>
				<div className="content">
					{ 
						props.children && React.cloneElement(props.children) 
					}
				</div>
			</div>
		);
	} else {
		return <Login />;
	}	
};

const mapState = ({auth, posts}) => ({auth, posts});
export default connect(mapState)(AdminComponent);
