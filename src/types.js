export const OwnerType {
    id: string,
    ownerName: string,
    teamNames: Array<string>
};

export const GameType {
    uuid: string,
    homeTeamId: OwnerType,
    awayTeamId: OwnerType,
    homeTeamScore: number,
    awayTeamScore: number,
    winner: string,
    loser: string,
};