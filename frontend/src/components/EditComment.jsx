import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Input, Button } from 'react-materialize';

import { updateComment } from '../actions/commentActions';

class EditComment extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        timestamp: '',
        body: '',
    }

    componentDidMount() {
        const { id } = this.props;
        const body = this.props.comments.filter(comment =>
            // finds the body of the relevant comment
            comment.id === id
        )[0].body
        this.setState({
            body: body,
        });
    }

    onInputHandler = (e) => {
        this.setState({
            body: e.target.value,
        })
    }

    onSubmitHandler = () => {
        const { dispatch, id } = this.props;
        this.setState({
            timestamp: new Date().getTime(),
        }, () => {
            dispatch(updateComment(id, this.state));
        })
    }

    render() {
        const styles = {
            edit: {
                marginBottom: '15px',
            }
        }
        const commentBody = this.state.body;
        if (commentBody !== '') {
            // if statement to make sure that defaultValue gets a value when rendering
            return (
                <div style={styles.edit}>
                    <Row>
                        <Input s={4}
                            type="textarea"
                            label="Edit Comment"
                            name="body"
                            onChange={this.onInputHandler}
                            defaultValue={commentBody}/>
                    </Row>
                    <Button waves="light" name="submit" onClick={this.onSubmitHandler}>Save</Button>
                </div>
            );
        }
        return (<div></div>);
    }
}

const mapStateToProps = ({ comments }) => ({
    comments: comments.items,
})

export default connect(mapStateToProps)(EditComment);