export const OwnerType {
    id: string,
    ownerName: string,
    teamNames: Array<string>
};

export const GameType {
    uuid: string,
    homeTeamId: string,
    awayTeamId: string,
    homeTeamScore: number,
    awayTeamScore: number,
    winner: string,
    loser: string,
};