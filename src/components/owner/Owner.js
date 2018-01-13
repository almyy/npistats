// @flow

import React, { Component, Fragment } from 'react';
import type { OwnerType, GameType } from '../../types';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { OWNER_BY_OWNERID_QUERY, GAMES_BY_OWNERID_QUERY} from '../../graphql/queries';


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

const Game = ({game}) => {
    return (
        <div>
            GAME: 
            <div>{game.winner}</div>
            <div>{game.homeTeamScore}</div>
            <div>{game.awayTeamScore}</div>
            <div>{game.winner}</div>
        </div>
    )
}

const GameList = ({loading, games}) => {
    if (loading) return <div/>
    return (
        <div> 
            {games.map((game) => <Game key={game.uuid} game={game} /> )}
        </div>
    )
}

const Owner = (props: OwnerProps)  => {
    const { owner: {ownerByOwnerId, loading }, games } = props; 
    if(loading) return <div/>
    console.log(props);
    return (
        <Fragment>
            <Link to="/" >Back</Link>
            <h2> {ownerByOwnerId.ownerName} </h2>
            <GameList games={games.gamesByOwnerId} loading={games.loading}/> 
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
