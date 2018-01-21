import React from "react";

import style from "./GeneralStats.css";
import classNames from "classnames";
import PlayerPointTable from "./PlayerPointTable";

const HighestScoringGame = props => {
  let ownerPointMap = props.owners.map(owner => ({
    id: owner.id,
    ownerName: owner.ownerName,
    teamName: owner.teamNames[0],
    points: 0,
  }));

  props.games.forEach(game => {
    const homeOwnerIndex = ownerPointMap.findIndex(e => e.id === game.homeTeam.id);
    const awayOwnerIndex = ownerPointMap.findIndex(e => e.id === game.awayTeam.id);

    if (!ownerPointMap[homeOwnerIndex] || !ownerPointMap[awayOwnerIndex] || game.playOff) {
      return true;
    }

    if (ownerPointMap[homeOwnerIndex].points < game.homeTeamScore)
      ownerPointMap[homeOwnerIndex].points = game.homeTeamScore;
    if (ownerPointMap[awayOwnerIndex].points < game.awayTeamScore)
      ownerPointMap[awayOwnerIndex].points = game.awayTeamScore;
  });

  const filteredOwners = ownerPointMap
    .filter(elem => elem.points > 0)
    .sort((a, b) => b.points - a.points);

  ownerPointMap = filteredOwners.map(owner => ({
    ...owner,
    points: owner.points.toFixed(2),
  }));

  return (
    <div className={classNames("card", style.main)}>
      <h2> Highest scoring game </h2>
      <PlayerPointTable ownerPointMap={ownerPointMap} />
    </div>
  );
};

export default HighestScoringGame;
