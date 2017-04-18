import React from 'react';
import { connect } from 'react-redux';

class PostsContainer extends React.Component {
	constructor(props) {
		super(props);		
	}

	render(){
		return (
			<div>
				{ this.props.children && React.cloneElement(this.props.children) }
			</div>
		);
	}
}
const mapState = ({posts, auth}) => ({posts, auth});
const mapDispatch = {};
export default connect(mapState, mapDispatch)(PostsContainer);
