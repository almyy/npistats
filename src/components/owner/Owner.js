// @flow

import React, { Component, Fragment } from 'react';
import { Route, withRouter, NavLink } from 'react-router-dom';
import type { OwnerType, GameType } from '../../types';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import GameList from '../game/GameList';
import style from './Owner.css';

import { OWNER_BY_OWNERID_QUERY, GAMES_BY_OWNERID_QUERY, PLAY_OFF_GAMES_BY_OWNERID_QUERY, REGULAR_SEASON_GAMES_BY_OWNERID_QUERY} from '../../graphql/queries';

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
    const { owner: {ownerByOwnerId, loading }, games, match, playOff, regularSeason} = props;
    if(loading || games.loading) return <div/>
    return (
        <Fragment>
            {/* <Link to="/" >Back</Link> */}
            <div className={classNames(style.title, 'card')}> 
                <div>
                    <h1> {ownerByOwnerId.teamNames[0]} </h1>
                    <h4> {ownerByOwnerId.ownerName} </h4>
                </div>
                <nav className={classNames(style.nav )}>
                    <NavLink to={`/owner/${ownerByOwnerId.id}/`} exact activeClassName="selected"> All games </NavLink>
                    <NavLink to={`/owner/${ownerByOwnerId.id}/regularSeason`} activeClassName="selected"> Regular season </NavLink>
                    <NavLink to={`/owner/${ownerByOwnerId.id}/playOff`} activeClassName="selected"> Play Off </NavLink>
                </nav>
            </div> 
            <Route path={`${match.path}/`} exact component={() => <GameList games={games.gamesByOwnerId} loading={games.loading} ownerId={ownerByOwnerId.id} />} />
            <Route path={`${match.path}/playOff`} exact component={() => <GameList games={playOff.playOffGamesByOwnerId} loading={playOff.loading} ownerId={ownerByOwnerId.id} />} />
            <Route path={`${match.path}/regularSeason`} exact component={() => <GameList games={regularSeason.regularSeasonGamesByOwnerId} loading={regularSeason.loading} ownerId={ownerByOwnerId.id} />} />
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
    graphql(PLAY_OFF_GAMES_BY_OWNERID_QUERY, {
        name: "playOff",
        options: props => ({ variables: { ownerId: props.match.params.ownerId } })
    }),
    graphql(REGULAR_SEASON_GAMES_BY_OWNERID_QUERY, {
        name: "regularSeason",
        options: props => ({ variables: { ownerId: props.match.params.ownerId } })
    }),
);

export default withGames(withRouter(Owner));
