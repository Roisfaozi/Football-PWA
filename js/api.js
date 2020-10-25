const base_url = "https://api.football-data.org/v2/competitions/2021/standings"
const url_team = "https://api.football-data.org/v2/competitions/2021/teams"
const api_key = '5723a2a6cf034c7fa86f03fbeb1852fc'

function loadContent() {
    fetch(base_url, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-Auth-Token': api_key
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        let standings = data.standings[0].table
        console.log(standings)

        let placeStanding = standings.map((standings) => {
            return (
                `
        <tr>
            <td class="team-name">
            <span>${standings.position}. </span>
            <figure class="team-logo">
                <img src="${standings.team.crestUrl}" alt="${standings.team.name}">
            </figure>
            <h6 class="grey-text text-darken-4">${standings.team.name}</h6>
            </td>
            <td>${standings.playedGames}</td>
            <td>${standings.won}</td>
            <td>${standings.draw}</td>
            <td>${standings.lost}</td>
            <td>${standings.goalsFor}</td>
            <td>${standings.goalsAgainst}</td>
            <td>${standings.goalDifference}</td>
            <td>${standings.points}</td>
        </tr>
                `
            )
        })
        document.getElementById('standings').innerHTML = placeStanding.join('')
    })
        .catch((error) => {
            console.error(error)
        })
}


function loadTeam() {
    fetch(url_team, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'X-Auth-Token': api_key
        }
    }).then((response) => {
        return response.json()
    }).then((data) => {
        let teams = data.teams

        let placeTeam = teams.map((team) => {
            return (
                `<div class="col s12 m6 l4">
                        <div class="card">
                            <div class="card-image">
                                <img src="${team.crestUrl}">
                            </div>
                            <div class="card-content">
                                <h6>${team.name}</h6>
                            </div>
                            <button class="waves-effect waves-light btn" id="add">Favorite</button>
                        </div>
                </div>`
            )
        })
        document.getElementById('team').innerHTML = placeTeam.join('')
        console.log(placeTeam)
    }).catch((error) => {
        console.log(error)
    })
}

function getFavoriteTeam() {
    getAll().then((team) => {
        console.log(team)

        let favHtml = ''
        team.forEach((team) => {
            favHtml +=
                `<div class="col s12 m6 l4">
                        <div class="card">
                            <div class="card-image">
                                <img src="${team.crestUrl}">
                            </div>
                            <div class="card-content">
                                <h6>${team.name}</h6>
                            </div>
                            <btn class="waves-effect waves-light btn" id="delete">Delete</btn>
                        </div>
                </div>`
        })
        document.getElementById('favorite').innerHTML = favHtml
    })
}