// @flow

import React, { Component, Fragment } from 'react';
import type { OwnerType, GameType } from '../../types';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import GameList from '../game/GameList';
import style from './Owner.css';

import { OWNER_BY_OWNERID_QUERY, GAMES_BY_OWNERID_QUERY} from '../../graphql/queries';

const KeyStats = ({games, loading, ownerId}) => {
    if (loading) return <div/>
    const numberOfWins = games.filter(game => {return game.winner === ownerId}).length;
    const numberOfLosses = games.filter(game => {return game.loser === ownerId}).length;
    const winRatio = +(numberOfWins/numberOfLosses).toFixed(2);
    return (
        <div className={classNames(style.keyStats, "card")}>
            <div className="championship">
                <span> Championships </span>
                <span> Toilet bowls </span>
            </div>
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


type OwnerProps = {
    owner: {
      ownerByOwnerId: OwnerType,
      loading: boolean,
    },
    games: {
        gamesByOwnerId: Array<GameType>,
        loading: boolean
    }
}

const Owner = (props: OwnerProps)  => {
    const { owner: {ownerByOwnerId, loading }, games } = props;
    if(loading) return <div/>
    return (
        <Fragment>
            {/* <Link to="/" >Back</Link> */}
            <h2> {ownerByOwnerId.ownerName} </h2>
            <KeyStats games={games.gamesByOwnerId} loading={games.loading} ownerId={ownerByOwnerId.id}/>
            <GameList games={games.gamesByOwnerId} loading={games.loading} ownerId={ownerByOwnerId.id}/>
        </Fragment>

    )
}

const withGames = compose(
    graphql(OWNER_BY_OWNERID_QUERY, {
        name: "owner",
        options: props => ({ variables: { ownerId: props.match.params.ownerId } })
    }),
    graphql(GAMES_BY_OWNERID_QUERY, {
        name: "games",
        options: props => ({ variables: { ownerId: props.match.params.ownerId } })
    }),
);

export default withGames(Owner);
