// @flow

import React, { Fragment } from 'react';
import { NavLink, Route } from 'react-router-dom';
import classNames from 'classnames';
import style from './Header.css';


const NavHeader = (props) => {
    const { routes } = props;
    return (
        <Fragment>
            <div className={classNames(style.title, 'card', props.className)}> 
                <nav className="card-nav">
                    {routes.map(
                        route => <NavLink to={route.path} activeClassName="selected"> {route.title} </NavLink>
                    )}
                </nav>
            </div> 
            {routes.map(route => <Route path={route.path} component={route.component} />)}
        </Fragment>
    )
}

export default NavHeader;