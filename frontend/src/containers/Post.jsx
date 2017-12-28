import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-materialize';
import * as moment from 'moment';
import { withRouter } from 'react-router-dom';

import { fetchPost, deletePost } from '../actions/postActions';
import NewPost from '../containers/NewPost.jsx';
import Votes from '../components/Votes.jsx';
import Comments from '../components/Comments.jsx';
import NewComment from '../components/NewComment.jsx';

class Post extends Component {
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
        newComment: false,
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchPost(this.props.match.params.id));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.post.didInvalidate) {
            // Reroute if there is something wrong
            this.props.history.push("/404");
        }
        if ((this.props.post.item !== nextProps.post.item) && nextProps.post.item === {}) {
            // Reroute to root when post has been deleted
            this.props.history.push("/");
        }
        if(this.props.comments !== nextProps.comments.items) {
            // If a new comment was made, unmount NewComment Component
            this.setState({ newComment: false })
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
            edit: !this.state.edit,
        })
    }

    onCommentHandler = () => {
        this.setState({
            newComment: !this.state.newComment,
        })
    }

    render() {
        const styles = {
            votes: {
                float: 'left',
                marginRight: '15px',
            }
        }
        return (
            <div>
                <Row>
                    <Col s={2}>
                    </Col>
                    <Col s={9}>
                        <h2>{this.props.post.item.title}</h2>
                        <i>
                            {this.props.post.item.author} | {this.convertToDate(this.props.post.item.timestamp)} | {this.props.post.item.category} | Comments: {this.props.post.item.commentCount}
                        </i>
                        <p>{this.props.post.item.body}</p>
                        <Button waves="light" name="submitPost" onClick={this.onDeleteHandler}>Delete</Button>
                        <Button waves="light" name="editPost" onClick={this.onEditHandler}>Edit Post</Button>
                        <Button waves="light" name="newComment" onClick={this.onCommentHandler}>New Comment</Button>
                        <div style={styles.votes}>
                            <Votes id={this.props.match.params.id}/>
                        </div>
                        { this.state.edit && <NewPost post={this.props.post.item} />}
                    </Col>
                </Row>
                <Row>
                    <Col s={2}>
                    </Col>
                    <Col s={9}>
                        { this.state.newComment && <NewComment /> }
                    </Col>
                </Row>
                <Row>
                    <Col s={2}>
                    </Col>
                    <Col s={9}>
                        <Comments id={this.props.match.params.id}/>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ posts, comments }) => ({
    post: posts,
    comments: comments.items, // Adding this to detect if a new comment has been made
});

export default withRouter(connect(mapStateToProps)(Post));
