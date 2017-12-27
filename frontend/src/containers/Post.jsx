import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-materialize';
import * as moment from 'moment';

import { fetchPost, deletePost } from '../actions/postActions';


class Post extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        id: '',
        timestamp: 0,
        title: '',
        body: '',
        author: '',
        category: 'react',
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPost(this.props.match.params.id));
    }

    convertToDate = (timestamp) => {
        const date = moment(timestamp);
        return date.toString();
    }

    onDeleteHandler = () => {
        const { dispatch } = this.props;
        dispatch(deletePost(this.props.match.params.id));
    }

    render() {
        return (
            <div>
                <h2>{this.props.post.title}</h2>
                <i>
                    {this.props.post.author} | {this.convertToDate(this.props.post.timestamp)} | {this.props.post.category}
                </i>
                <p>{this.props.post.body}</p>
                <Button waves="light" name="submitPost" onClick={this.onDeleteHandler}>Delete</Button>
            </div>
        );
    }
}

const mapStateToProps = ({ posts }) => ({
    post: posts.item,
});

export default connect(mapStateToProps)(Post);
// export default Post;
