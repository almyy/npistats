import React from 'react';
import classNames from 'classnames';

import Championships from './Championships';
import style from './KeyStats.css';

const KeyStats = ({games, loading, ownerId, children}) => {
    if (loading) return <div/>
    const numberOfWins = games.filter(game => {return game.winner === ownerId}).length;
    const numberOfLosses = games.filter(game => {return game.loser === ownerId}).length;
    const winRatio = +(numberOfWins/numberOfLosses).toFixed(2);
    return (
        <div className={classNames(style.keyStats, "card")}>
            <Championships />
            <div>
                <div className="numbers">
                    <span className="number"> <span> Wins: </span> <span className="wins">{numberOfWins} </span></span>
                    <span className="number"> <span> Losses: </span> <span className="losses">{numberOfLosses} </span> </span>
                </div>
                <div className="numbers">
                    <span className="number"> <span> Win ratio: </span> <span className={classNames({wins: winRatio >= 1, losses: winRatio < 1})}>{winRatio} </span></span>
                </div>
            </div>
        </div>
    )
}

export default KeyStats;