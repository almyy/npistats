import React from "react";
import { graphql } from "react-apollo";

import Loader from "../loader/Loader";
import { GAMES_BY_SEASON_QUERY } from "../../graphql/queries";

const SeasonStats = ({ season, data: { loading, gamesBySeason } }) => {
  if (loading) return <Loader />;
  return <div>{season}</div>;
};

const withSeason = graphql(GAMES_BY_SEASON_QUERY, {
  options: props => ({ variables: { season: props.season } }),
});

export default withSeason(SeasonStats);
