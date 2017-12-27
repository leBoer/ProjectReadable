import React from 'react';
import { NavLink } from 'react-router-dom';

const styles = {
    float: 'left',
    margin: '0 5px',
}
const FilterLink = ({ filter, children }) => (
    <NavLink
        to={filter === 'SHOW_ALL' ? '/' : `${ filter }`}
        activeStyle={ {
            textDecoration: 'none',
            color: 'black',
        }}
    >
        <div style={styles}>
            {children}
        </div>
    </NavLink>
)

export default FilterLink;
