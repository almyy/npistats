import React from 'react';
import Game from './Game';
import type { GameType } from '../../../types';

import style from './GameList.css';

const GameList = ({loading, games, ownerId}: {games: Array<GameType>, loading: boolean}) => {
    if (loading) return <div/>
    return (
        <div className={style.list}> 
            {games.map((game) => <Game key={game.uuid} game={game} ownerId={ownerId} /> )}
        </div>
    )
}

export default GameList;