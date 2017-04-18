import React from 'react';
import { connect } from 'react-redux';

class PostDetail extends React.Component {
	constructor(props) {
		super(props);		
	}

	render(){
		return (
			<div>
				Detail
			</div>
		);
	}
}
const mapState = ({posts, auth}) => ({posts, auth});
const mapDispatch = {};
export default connect(mapState, mapDispatch)(PostDetail);
