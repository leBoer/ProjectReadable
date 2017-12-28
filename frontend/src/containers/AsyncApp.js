import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPostsIfNeeded } from '../actions/postActions';
import Posts from '../components/Posts.jsx';

class AsyncApp extends Component {
	componentDidMount() {
		const { dispatch } = this.props
		dispatch(fetchPostsIfNeeded(this.props.posts));
	}

	render() {
		const { posts, isFetching } = this.props
		return (
			<div>
				<div>
					{isFetching && posts.items.length === 0 && <h2>Loading...</h2>}
					{!isFetching && posts.items.length === 0 && <h2>Empty.</h2>}
					{posts.items.length > 0 &&
						<div style={{ opacity: isFetching ? 0.5 : 1 }}>
							<Posts />
						</div>}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ posts, categories, isFetching }) => ({
	posts: posts,
	isFetching: posts.isFetching,
	categories: categories.items,
});

export default connect(mapStateToProps)(AsyncApp)