import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Input,
    Row,
    Col,
    Button
} from 'react-materialize';

import { updatePost } from '../actions/postActions';

class EditPost extends Component {
    state = {
        post: {
            id: '',
            timestamp: 0,
            title: '',
            body: '',
            author: '',
            category: '',
        }
    }

    componentDidMount() {
        const { id } = this.props
        const post = this.props.posts.find(
            post => post.id === id
        )
        this.setState({
            post: Object.assign(this.state.post, {
                id: id,
                timestamp: new Date().getTime(),
                title: post.title,
                body: post.body,
                author: post.author,
                category: post.category,
            })
        });
    }

    onInputHandler = (e) => {
        this.setState({
            post: Object.assign(this.state.post, {
                [e.target.name]: e.target.value,
            })
        });
    }

    onSubmitHandler = () => {
        const { dispatch } = this.props;
        const params = {
            title: this.state.post.title,
            body: this.state.post.body,
            category: this.state.post.category,
            author: this.state.post.author,
        }
        dispatch(updatePost(this.state.post.id, params));
    }

    generateCategories = (categories) => {
        return categories.map((item, index) => {
            return <option value={item} key={index}>{item}</option>;
        });
    }

    render() {
        const post = this.state.post;
        if (post.id) {
            return (
                <div>
                    <Col s={1} />
                    <Col s={4}>
                        <Row>
                            <Input s={12}
                                type="text"
                                label="Author"
                                name="author"
                                onChange={this.onInputHandler}
                                defaultValue={post.author} />
                        </Row>
                        <Row>
                            <Input s={12}
                                type="select"
                                label="Select Category"
                                name="category"
                                onChange={this.onInputHandler}
                                defaultValue={post.category}>
                                {this.generateCategories(this.props.categories)}
                            </Input>
                        </Row>
                        <Row>
                            <Input s={12}
                                className="active"
                                type="text"
                                label="Title"
                                name="title"
                                onChange={this.onInputHandler}
                                defaultValue={post.title} />
                        </Row>
                        <Row>
                            <Input s={12}
                                type="textarea"
                                label="Write your post here"
                                name="body"
                                onChange={this.onInputHandler}
                                defaultValue={post.body} />
                        </Row>
                        <Row>
                            <Col s={12}>
                                <Button waves="light"
                                    name="submitPost"
                                    onClick={this.onSubmitHandler}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </div>
            );
        }
        return <div></div>;
    }
}

const mapStateToProps = ({ posts, categories }) => ({
    posts: posts.items,
    categories: categories.items,
})

export default connect(mapStateToProps)(EditPost);