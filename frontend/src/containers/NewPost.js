import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Input, Button } from 'react-materialize';

import { postNewPost } from '../actions/postActions';

class NewPost extends Component {
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

    generateCategories = (categories) => {
        return categories.map((item, index) => {
            return <option value={item} key={index}>{item}</option>
        });
    }

    onInputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onSubmitHandler = () => {
        const timestamp = new Date().getTime();
        const { dispatch } = this.props;
        this.setState({
            id: timestamp,
            timestamp: timestamp,
        }, () => {
            dispatch(postNewPost(this.state));
        });
        
    }

    render() {
        const { categories } = this.props;
        return (
            <div>
                <Row>
                    <Input s={3} type="select" label="Select Category" name="category" onChange={this.onInputHandler}>
                        { this.generateCategories(categories) }
                    </Input>
                </Row>
                <Row>
                    <Input s={3} type="text" label="Title" name="title" onChange={this.onInputHandler}/>
                </Row>
                <Row>
                    <Input s={3} type="text" label="Author" name="author" onChange={this.onInputHandler}/>
                </Row>
                <Row>
                    <Input s={3} type="textarea" label="Write your post here" name="body" onChange={this.onInputHandler}/>
                </Row>
                <Row>
                    <Col s={3}>
                        <Button waves="light" name="submitPost" onClick={this.onSubmitHandler}>Submit</Button>
                    </Col>
                </Row>
            </div>
        );
    }

}

const mapStateToProps = ({ categories }) => ({
    categories: categories.items,
});

export default connect(mapStateToProps)(NewPost);
