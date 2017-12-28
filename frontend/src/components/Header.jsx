import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, NavItem } from 'react-materialize';

import { fetchCategoriesIfNeeded } from '../actions/categoryActions';

class Header extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCategoriesIfNeeded(this.props.categories));
    }

    render() {
        const { categories } = this.props;
        return (
            <div>
                <Navbar brand="Project Readable" left>
                    { categories.items.map((item, index) => {
                        return <NavItem href={`/${item}`} key={index}>{item}</NavItem>
                    })}
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = ({ categories }) => ({
    categories: categories,
});

export default connect(mapStateToProps)(Header);
