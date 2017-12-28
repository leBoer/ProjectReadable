import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
    Row,
    Col,
    Button,
    Collection,
    CollectionItem
} from 'react-materialize';
import * as moment from 'moment';

import Votes from '../components/Votes.jsx';

const styles = {
    order: {
        marginBottom: '10px',
    },
    voting: {
        paddingTop: '10px',
    }
}

class Posts extends Component {
    state = {
        sorting: 'timestamp',
        posts: [],
    }

    componentDidMount() {
        if (this.props.match.params.category) {
            // if the url has a category param
            this.setState({
                posts: this.filterPosts(this.props.posts),
            });
        } else {
            this.setState({
                posts: this.props.posts,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        // If you lost the store at /newpost (by refreshing for instance),
        // this will make sure that it is repopulated again
        console.log(nextProps);
        if (nextProps.posts.length !== this.props.posts.length) {
            this.setState({
                posts: nextProps.posts,
            });
        } else if ((nextProps.posts.length === this.props.posts.length)
                    && (nextProps.posts !== this.props.posts)
                    && (this.props.match.params.category)) {
            // Makes sure you can vote and get dynamic updates on category view
            console.log('does it go here');
            this.setState({
                posts: this.filterPosts(nextProps.posts),
            });
        } else {
            // Makes sure you can vote and get dynamic updates on root view
            this.setState({
                posts: nextProps.posts,
            })
        }
    }
    createPosts = (post, i) => {
        // Returns a post
        return (
            <Row key={i}>
                <Col s={1}>
                    <div style={styles.voting}>
                        <Votes id={post.id}/>
                    </div>
                </Col>
                <Col s={7}>
                    <CollectionItem href={`/${post.category}/${post.id}`}>
                        <b>{post.title}</b>
                        <br />
                        Votes: {post.voteScore}
                        <br />
                        Comments: {post.commentCount}
                        <br />
                        Date: {this.convertToDate(post.timestamp)}
                    </CollectionItem>
                </Col>
            </Row>
        )
    }

    filterPosts = (posts) => {
        // Returns an array of posts, filtered by category
        const reducedPosts = posts.reduce((filtered, post) => {
            if (post.category === this.props.match.params.category) {
                filtered.push(post);
            }
            return filtered;
        }, []);
        return reducedPosts;
    }

    convertToDate = (timestamp) => {
        // Converts timestamp to date string
        const date = moment(timestamp);
        return date.toString();
    }

    sortPosts = (posts, sorting) => {
        // Sorts posts ascending
        return (
            posts
                .sort((a, b) => a[sorting] < b[sorting])
                .map((post, i) => this.createPosts(post, i))
        )
    }

    changeSorting = (e) => {
        // Sets the sorting criteria
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
                <Row>
                    <Collection>
                        {this.sortPosts(this.state.posts, this.state.sorting)}
                    </Collection>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = ({ posts }) => ({
    posts: posts.items,
})

export default withRouter(connect(mapStateToProps)(Posts));