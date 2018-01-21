import React from "react";
import classNames from "classnames";
import style from "./GeneralStats.css";

const PlayerPointTable = ({ ownerPointMap }) => {
  return (
    <div className={classNames(style.table)}>
      <div className="header">
        <div>Team</div>
        <div>Points</div>
      </div>
      <div className="body">
        {ownerPointMap.map(owner => (
          <div className="table-row" key={`tb-${owner.id}`}>
            <div>{owner.teamName}</div>
            <div>{owner.points}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerPointTable;
