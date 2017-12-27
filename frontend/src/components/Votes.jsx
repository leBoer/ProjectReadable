import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';

import { votePost } from '../actions/postActions';

class Votes extends Component {

    onVoteHandler = (vote) => {
        const { dispatch, id } = this.props;
        dispatch(votePost(id, {'option': vote}));
    }

    render() {
        const styles = {
            icon: {
                marginRight: '15px',
                float: 'left',
            },
            votes: {
                paddingTop: '7px',
                float: 'left',
                marginRight: '15px',
            }
        }
        return (
            <div>
                <div style={styles.icon}>
                    <Button floating waves="light" icon="thumb_up" onClick={() => this.onVoteHandler('upVote')} />
                </div>
                <div style={styles.votes}>
                    {this.props.voteScore}
                </div>
                <div style={styles.icon}>
                    <Button floating waves="light" icon="thumb_down" onClick={() => this.onVoteHandler('downVote')}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ posts }) => ({
    voteScore: posts.item.voteScore,
});

export default connect(mapStateToProps)(Votes);