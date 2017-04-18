import React from 'react';
import { connect } from 'react-redux';

class PostForm extends React.Component {
	constructor(props) {
		super(props);		
	}

	render(){
		return (
			<div>
				Form
			</div>
		);
	}
}
const mapState = ({posts, auth}) => ({posts, auth});
const mapDispatch = {};
export default connect(mapState, mapDispatch)(PostForm);
