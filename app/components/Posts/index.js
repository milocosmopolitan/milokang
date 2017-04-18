import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostsComponent extends Component {
	constructor(props) {
		super(props);		
	}

	render() {
    
		return (
			<div>
        <h1>This is project section</h1>
        <p>
          we will need to modifiy this part to show list of projects from database
        </p>
      </div>
		);
	}

}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({}, ownProps) => {  
  return {}
}

const mapDispatch = {}

export default connect(mapState, mapDispatch)(PostsComponent);