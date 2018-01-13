import cheerio from 'cheerio';

const mapTeamNameAndOwners = (response, year) => {
    const $ = cheerio.load(response.data);

    const data = $(this);
    const teamNames = [];
    const owners = [];
    const ownerIds = [];
    const currentSeason = []
    let currentYear = "";
        
    $('.teamName').each((element, e) => {
        currentYear = $(e).attr('href').slice(24).substr(0,4)
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

export default mapTeamNameAndOwners;