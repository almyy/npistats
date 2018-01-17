import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom'

import { OWNER_BY_OWNERID_QUERY, PLAY_OFF_GAMES_BY_OWNERID_QUERY} from '../../../graphql/queries';

const Championships = ({playOff, owner: {ownerByOwnerId: {id}}}) => {
    if (playOff.loading) return <div/>
    const championshipsWon = playOff.playOffGamesByOwnerId.filter(game => {
        return game.week === "16" && game.winner === id;
    }).length;
    return (
        <div className="championship">
            <span> Championships: </span> <span className="wins">{championshipsWon} </span>
            {/* <span> Toilet bowls </span> */}
        </div>
    )
}

const withGames = compose(
    graphql(PLAY_OFF_GAMES_BY_OWNERID_QUERY, {
        name: "playOff",
        options: props => ({ variables: { ownerId: props.match.params.ownerId } })
    }),
    graphql(OWNER_BY_OWNERID_QUERY, {
        name: "owner",
        options: props => ({ variables: { ownerId: props.match.params.ownerId } })
    }),
);

export default withRouter(withGames(Championships));