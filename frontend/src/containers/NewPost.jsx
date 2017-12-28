import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Button } from 'react-materialize';
import { withRouter } from 'react-router-dom';

import { postNewPost, updatePost } from '../actions/postActions';

class NewPost extends Component {
    state = {
        post: {
            id: '',
            timestamp: 0,
            title: '',
            body: '',
            author: '',
            category: 'react',
        }
    }

    generateCategories = (categories) => {
        return categories.map((item, index) => {
            return <option value={item} key={index}>{item}</option>;
        });
    }

    onInputHandler = (e) => {
        this.setState({
            post: Object.assign(this.state.post, {
                [e.target.name]: e.target.value,
            })
        });
    }

    componentWillReceiveProps(nextProps) {
        // If new post or edited, reroute to root
        if (nextProps.post !== this.props.post) {
            this.props.history.push("/");
        }
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({
                post: this.props.post
            });
        }
    }

    onSubmitHandler = () => {
        const timestamp = new Date().getTime();
        const { dispatch } = this.props;
        this.setState({
            post: Object.assign(this.state.post, {
                id: timestamp,
                timestamp: timestamp,
            })
        }, () => {
            if (this.props.match.params.id) {
                // If this is editing an existing post
                const params = {
                    title: this.state.post.title,
                    body: this.state.post.body,
                    category: this.state.post.category,
                    author: this.state.post.author,
                }
                dispatch(updatePost(this.props.match.params.id, params));
            } else {
                dispatch(postNewPost(this.state.post));
            }
        });
        
    }

    render() {
        const { categories } = this.props;
        const post = this.state.post;
        const styles = {
            marginTop: '15px',
        }
        if (post.id || !this.props.match.params.id) {
            // if statement to make sure that defaultValue gets a value when rendering
            return (
                <div style={styles}>
                    <Row>
                        <Input s={4}
                               type="text"
                               label="Author"
                               name="author"
                               onChange={this.onInputHandler}
                               defaultValue={post.author}/>
                    </Row>
                    <Row>
                        <Input s={4}
                               type="select"
                               label="Select Category"
                               name="category"
                               onChange={this.onInputHandler}
                               defaultValue={post.category}>
                            { this.generateCategories(categories) }
                        </Input>
                    </Row>
                    <Row>
                        <Input s={4}
                               className="active"
                               type="text"
                               label="Title"
                               name="title"
                               onChange={this.onInputHandler}
                               defaultValue={post.title}/>
                    </Row>
                    <Row>
                        <Input s={4}
                               type="textarea"
                               label="Write your post here"
                               name="body"
                               onChange={this.onInputHandler}
                               defaultValue={post.body}/>
                    </Row>
                    <Row>
                        <Col s={4}>
                            <Button waves="light"
                                    name="submitPost"
                                    onClick={this.onSubmitHandler}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </div>
            );
        }
        return (<div></div>);
    }

}

const mapStateToProps = ({ categories, posts }) => ({
    categories: categories.items,
    post: posts.item,
});

export default withRouter(connect(mapStateToProps)(NewPost));
