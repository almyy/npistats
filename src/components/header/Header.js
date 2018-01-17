import React, { Fragment } from 'react'; 
import { Switch, Route, NavLink } from 'react-router-dom';
import classNames from 'classnames';

import style from './Header.css';

const Header = () => {
    return (
        <div className={style.header}>
            <div className="container">
                <nav>
                    <NavLink to="/" exact activeClassName="selected" > Owners </NavLink>
                    {/* <NavLink to="/stats" activeClassName="selected" > Stats </NavLink> */}
                </nav>
            </div>
        </div>
    )
}

export default Header;