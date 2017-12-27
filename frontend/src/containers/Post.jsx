import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-materialize';
import * as moment from 'moment';
import { withRouter } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions/postActions';
import NewPost from '../containers/NewPost.jsx';


class Post extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        post: {
            id: '',
            timestamp: 0,
            title: '',
            body: '',
            author: '',
            category: 'react',
        },
        edit: false,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPost(this.props.match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        if ((this.props.post !== nextProps.post.item) && nextProps.post.item === {}) {
            this.props.router.push("/");
        }
    }

    convertToDate = (timestamp) => {
        const date = moment(timestamp);
        return date.toString();
    }

    onDeleteHandler = () => {
        const { dispatch } = this.props;
        dispatch(deletePost(this.props.match.params.id));
        this.props.history.push("/");
    }

    onEditHandler = () => {
        this.setState({
            edit: true,
        })
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
                <Button waves="light" name="editPost" onClick={this.onEditHandler}>Edit Post</Button>
                { this.state.edit && <NewPost post={this.props.post} />}
            </div>
        );
    }
}

const mapStateToProps = ({ posts }) => ({
    post: posts.item,
});

export default withRouter(connect(mapStateToProps)(Post));
