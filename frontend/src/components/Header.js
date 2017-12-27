import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem } from 'react-materialize';

import { fetchCategoriesIfNeeded } from '../actions';

class Header extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCategoriesIfNeeded('test3'));
    }

    render() {
        const { categories } = this.props;
        return (
            <div>
                <Navbar brand="Project Readable" left>
                    { categories.map((item, index) => {
                        return <NavItem href="/item" key={index}>{item}</NavItem>
                    })}
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = ({ categories }) => ({
    categories: categories.items,
});

export default connect(mapStateToProps)(Header);
