import React from 'react';

import style from './Loader.css';

const Loader = (props) => {
    return ( 
        <div className={style.root}>
            <span className="outer"> </span>
        </div> 
    )
}

export default Loader;