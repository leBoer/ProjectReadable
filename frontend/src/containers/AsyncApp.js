import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategoriesIfNeeded } from '../actions';
import { fetchPostsIfNeeded } from '../actions/postActions';
import Posts from '../components/Posts.jsx';
import Header from '../components/Header';
import FilterLink from '../components/FilterLink';

class AsyncApp extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    // dispatch(fetchCategoriesIfNeeded('test'));
    dispatch(fetchPostsIfNeeded());
  }

  componentDidUpdate(prevProps) {
  }

  render() {
    const { posts, isFetching, lastUpdated, categories } = this.props
    const styles = {
      heading: {
        width: '100%',
        marginTop: '15px',
        h1: {
          marginBottom: '5px',
        }
      },
      categories: {
        margin: '15px 0',
        fontSize: '20px',
      }
    }
    return (
      <div>
        <div>
          {isFetching && posts.length === 0 && <h2>Loading...</h2>}
          {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
          {posts.length > 0 &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>}
        </div>
      </div>
    );
  }
}

AsyncApp.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = ({ posts, categories, isFetching }) => ({
  posts: posts.items,
  isFetching: posts.isFetching,
  categories: categories.items,
});

export default connect(mapStateToProps)(AsyncApp)