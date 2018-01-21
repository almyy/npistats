import React, {Fragment} from 'react';
import {Route, NavLink } from 'react-router-dom';

import classNames from 'classnames';
import style from './GeneralStats.css';

const GeneralStats = (props) => {
    const {match } = props;
    return (
        <Fragment>
        <div className={classNames(style.title, 'card')}> 
            <nav className="card-nav">
                <NavLink to={`/stats/2014/`} exact activeClassName="selected"> 2014 </NavLink>
                <NavLink to={`/stats/2015/`} activeClassName="selected"> 2015 </NavLink>
                <NavLink to={`/stats/2016/`} activeClassName="selected"> 2016 </NavLink>
                <NavLink to={`/stats/2017/`} activeClassName="selected"> 2017 </NavLink>
            </nav>
        </div> 
        <Route path={`${match.path}/2014`} exact component={() => <div/> } />
        <Route path={`${match.path}/2015`} exact component={() => <div/> } />
        <Route path={`${match.path}/2016`} exact component={() => <div/> } />
        <Route path={`${match.path}/2017`} exact component={() => <div/> } />
        </Fragment>
    )
}

export default GeneralStats;