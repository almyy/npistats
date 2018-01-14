import React from 'react';
import classNames from 'classnames';

import style from './GameList.css';

const Game = ({game, ownerId}) => {
    const awayWinner = game.awayTeamScore > game.homeTeamScore;
    const ownerWonGame = game.winner === ownerId;
    return (
        <div className={classNames(style.game, "card", {winner: ownerWonGame})}>
            <div className="title">
                <h3 className="teamName"> {game.awayTeamId.teamNames[0]} </h3>
                <span className="vs"> vs </span>
                <h3 className="teamName"> {game.homeTeamId.teamNames[0]} </h3>
            </div>
            
            <div className="scores">

                <div className={classNames("score", {scoreWinner: awayWinner })} > {game.awayTeamScore} </div>
                <span/>
                <div className={classNames("score", {scoreWinner: !awayWinner })} > {game.homeTeamScore} </div>
            </div>
        </div>
    )
}

export default Game;