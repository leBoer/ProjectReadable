import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { Button } from 'react-materialize';

import EditComment from './EditComment.jsx';

import {
    fetchComments,
    voteComment,
    deleteComment
} from '../actions/commentActions';

class Comments extends Component {
    state = {
        editComment: false,
        editCommentId: '',
    }

    componentDidMount() {
        const { dispatch, id } = this.props;
        dispatch(fetchComments(id));
    }

    componentWillReceiveProps(nextProps) {
        // If there comment has been edited, unmount edit
        if(nextProps.comments !== this.props.comments) {
            this.setState({ editComment: false });
        }
    }

    onVoteHandler = (vote, comment) => {
        const { dispatch } = this.props;
        dispatch(voteComment(comment.id, {'option': vote}));
    }

    onDeleteHandler = (id) => {
        const { dispatch } = this.props;
        dispatch(deleteComment(id));
    }

    onEditHandler = (id) => {
        // Mount and unmount edit
        this.setState({
            editComment: !this.state.editComment,
            editCommentId: id,
        });
    }

    createComments = (comment, i) => {
        const styles = {
            comment: {
                borderTop: 'solid 1px',
                marginBottom: '25px',
            },
            icon: {
                float: 'right',
                marginRight: '15px',
            },
        }
        return (
            <div key={i} style={styles.comment}>
                <p>{comment.body}</p>
                <i>
                    {comment.author} | {this.convertToDate(comment.timestamp)} | Votes: {comment.voteScore}
                </i>
                <div style={styles.icon}>
                    <Button floating waves="light" icon="thumb_up" onClick={() => this.onVoteHandler('upVote', comment)} />
                </div>
                <div style={styles.icon}>
                    <Button floating waves="light" icon="thumb_down" onClick={() => this.onVoteHandler('downVote', comment)} />
                </div>
                <div style={styles.icon}>
                    <Button floating waves="light" icon="delete" onClick={() => this.onDeleteHandler(comment.id)} />
                </div>
                <div style={styles.icon}>
                    <Button floating waves="light" icon="edit" onClick={() => this.onEditHandler(comment.id)} />
                </div>
            </div>
        )
    }

    convertToDate = (timestamp) => {
        const date = moment(timestamp);
        return date.toString();
    }
    render() {
        return (
            <div>
                { this.state.editComment && <EditComment id={this.state.editCommentId}/> }
                {
                    this.props.comments &&
                    this.props.comments.map((comment, i) =>
                        this.createComments(comment, i))
                }
            </div>
        )
    }
}

const mapStateToProps = ({ comments }) => ({
    comments: comments.items,
})

export default connect(mapStateToProps)(Comments);