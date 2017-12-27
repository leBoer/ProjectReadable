import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { Button } from 'react-materialize';

import { fetchComments, voteComment } from '../actions/commentActions';

class Comments extends Component {

    componentDidMount() {
        const { dispatch, id } = this.props;
        dispatch(fetchComments(id));
    }

    onVoteHandler = (vote, comment) => {
        const { dispatch } = this.props;
        console.log(comment.id);
        dispatch(voteComment(comment.id, {'option': vote}));
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