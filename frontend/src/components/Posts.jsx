import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Icon,
  Collection,
  CollectionItem
} from 'react-materialize';
import * as moment from 'moment';

const styles = {
  order: {
    marginBottom: '10px',
  }
}

export default class Posts extends Component {
  state = {
    sorting: 'timestamp',
  }
  createPosts = (post, i) => {
    return (
      <CollectionItem href={`/${post.category}/${post.id}`} key={i}>
        <b>{post.title}</b>
        <br/>
        Votes: {post.voteScore}
        <br/>
        Comments: {post.commentCount}
        <br/>
        Date: {this.convertToDate(post.timestamp)}
      </CollectionItem>
    )
  }

  convertToDate = (timestamp) => {
    const date = moment(timestamp);
    return date.toString();
  }

  sortPosts = (posts, sorting) => {
    return (
      posts
        .sort((a, b) => a[sorting] < b[sorting])
        .map((post, i) => this.createPosts(post, i))
    )
  }

  changeSorting = (e) => {
    this.setState({
      sorting: e.target.name,
    })
  }

  render() {
    return (
      <div>
        <div style={styles.order}>
          <Button waves="light" name="voteScore" onClick={this.changeSorting}>Order by Score</Button>
          <Button waves="light" name="timestamp" onClick={this.changeSorting}>Order by Time</Button>
          <Link to="/newpost"><Button name="newPost">Create New Post</Button></Link>
        </div>
        <div>
          <Collection>
            {this.sortPosts(this.props.posts, this.state.sorting)}
          </Collection>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}