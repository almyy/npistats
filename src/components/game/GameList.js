import React, {Fragment} from 'react';
import classNames from 'classnames';

import Game from './Game';
import KeyStats from './stats/KeyStats';
import type { GameType } from '../../../types';

import style from './GameList.css';

const GameList = ({loading, games, ownerId, children}: {games: Array<GameType>, loading: boolean}) => {
    if (loading) return <div/>
    return (
        <Fragment>
            <KeyStats games={games} loading={loading} ownerId={ownerId} />
            <div className={style.list}> 
                {games.map((game) => <Game key={game.uuid} game={game} ownerId={ownerId} /> )}
            </div>
        </Fragment>
    )
}

export default GameList;