import React, {Fragment} from 'react';

import classNames from 'classnames';
import NavHeader from '../header/NavHeader';

import style from './GeneralStats.css';

const GeneralStats = (props) => {
    const {match } = props;
    const routes = [
        {title: "2014", path: `${match.path}/2014`},
        {title: "2015", path: `${match.path}/2015`},
        {title: "2016", path: `${match.path}/2016`},
        {title: "2017", path: `${match.path}/2017`},
    ]
    return (
        <NavHeader routes={routes}/>
    )
}

export default GeneralStats;