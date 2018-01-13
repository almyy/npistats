import cheerio from 'cheerio';

export const getOwnersForCurrentSeason = (response, season) => {
    const $ = cheerio.load(response.data);

    const teamNames = [];
    const owners = [];
    const ownerIds = [];
    const currentSeason = []
        
    $('.teamName').each((element, e) => {
        teamNames.push($(e).text())
    });
    $('.userName').each((i, e) => {
        ownerIds.push($(e).attr('class').slice(16))
        owners.push($(e).text())
    });

    for(let u = 0; u < ownerIds.length; u++) {
        currentSeason.push({
            id: ownerIds[u],
            ownerName: owners[u],
            teamName: teamNames[u],
        })
    }
    return currentSeason;
}

const mapOwnerToTeamOwner = (owner) => ({
    id: owner.id,
    ownerName: owner.ownerName,
    teamNames: [owner.teamName],
});

export const mapAllTeamOwnersToTeamNames = (seasonMap) => {
    const teamOwners = [];
    Object.keys(seasonMap).map(key => {
        seasonMap[key].forEach(owner => {
            const team = teamOwners.filter(own => own.id===owner.id)[0];
            const exists = team !== undefined;
            if(!exists) {
                teamOwners.push(mapOwnerToTeamOwner(owner));
            }
            else {
                const index = teamOwners.findIndex((elem) => elem.id === owner.id);
                if(!teamOwners[index].teamNames.includes(owner.teamName)) {
                    teamOwners[index].teamNames.push(owner.teamName)
                }
            }
        });
        
    });
    return teamOwners;
};