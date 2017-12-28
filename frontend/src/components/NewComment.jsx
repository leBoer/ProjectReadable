import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Row, Col, Button } from 'react-materialize';

import { postComment } from '../actions/commentActions';

class NewComment extends Component {
    state = {
        comment: {
            id: '',
            timestamp: '',
            body: '',
            author: '',
            parentId: '',
        }
    }

    onSubmitHandler = () => {
        const timestamp = new Date().getTime();
        const { dispatch } = this.props;
        this.setState({
            comment: Object.assign(this.state.comment, {
                id: timestamp,
                timestamp: timestamp,
                parentId: this.props.match.params.id,
            })
        }, () => {
            dispatch(postComment(this.state.comment))
        });
    }

    onInputHandler = (e) => {
        this.setState({
            comment: Object.assign(this.state.comment, {
                [e.target.name]: e.target.value,
            })
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Input s={12} type="text" label="Author" name="author" onChange={this.onInputHandler} defaultValue={this.state.comment.author}/>
                </Row>
                <Row>
                    <Input s={12} type="textarea" label="Write your comment here" name="body" onChange={this.onInputHandler} defaultValue={this.state.comment.body}/>
                </Row>
                <Row>
                    <Col s={4}>
                        <Button waves="light" name="submitComment" onClick={this.onSubmitHandler}>Submit</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(connect(null)(NewComment));