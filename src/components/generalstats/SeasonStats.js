import React from "react";
import { graphql, compose } from "react-apollo";

import Loader from "../loader/Loader";
import { GAMES_BY_SEASON_QUERY, ALL_OWNERS_QUERY } from "../../graphql/queries";

import TotalPoints from "./TotalPoints";
import HighestScoringGame from "./HighestScoringGame";
import LowestScoringGame from "./LowestScoringGame";

const SeasonStats = props => {
  if (props.games.loading || props.owners.loading) return <Loader />;
  return (
    <div>
      <TotalPoints games={props.games.gamesBySeason} owners={props.owners.allOwners} />
      <HighestScoringGame games={props.games.gamesBySeason} owners={props.owners.allOwners} />
      <LowestScoringGame games={props.games.gamesBySeason} owners={props.owners.allOwners} />
    </div>
  );
};

const withSeason = compose(
  graphql(GAMES_BY_SEASON_QUERY, {
    name: "games",
    options: props => ({ variables: { season: props.season } }),
  }),
  graphql(ALL_OWNERS_QUERY, { name: "owners" })
);

export default withSeason(SeasonStats);
