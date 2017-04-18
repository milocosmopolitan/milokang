import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Row, Col, Table } from 'react-bootstrap';

import { removePost } from 'APP/app/reducers/posts';

class PostsList extends React.Component {
	constructor(props) {
		super(props);		
	}

	render(){
		const { posts } = this.props;
		return (
			<Grid fluid={true}>
				<Row>
					<Col xs={12}>
						<h1>Post Lists</h1>
						<div>
							<Link to="/admin/posts/add">Create new</Link>
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<Table>
							<thead>
					      <tr>
					        <th>#</th>
					        <th>title</th>
					        <th>slug</th>
					        <th>type</th>
					        <th>date</th>
					        <th>actions</th>
					      </tr>
					    </thead>
					    <tbody>
					    	{ 
									posts && posts.length
										? posts.map((post, index) => {
												return (
													<tr key={index}>
														<td>{post.id}</td>
														<td>
															<Link to={`/admin/posts/${post.id}/edit`}>{post.title}</Link>
														</td>
														<td>{post.slug}</td>
														<td>{post.type}</td>
														<td>{post.date}</td>
														<td>
															<div>
																<Link to={`/admin/posts/${post.id}/edit`}><i className="fa fa-pencil"></i></Link>
																<Link onClick={(e)=>{this.props.removePost(post.id)}}><i className="fa fa-times"></i></Link>
															</div>
														</td>
													</tr>
													);
											}) 
										: null
								}
				      </tbody>
						</Table>
					</Col>
				</Row>
			</Grid>
		);
	}
}
const mapState = ({posts, auth}) => ({posts, auth});
const mapDispatch = { removePost };
export default connect(mapState, mapDispatch)(PostsList);
