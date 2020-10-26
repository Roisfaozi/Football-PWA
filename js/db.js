let dbPromised = idb.open('team-favorite', 1, (upgradeDb) => {
    let teamObjectStore = upgradeDb.createObjectStore('teams', {
        keyPath: 'id'
    })
    teamObjectStore.createIndex('name', 'name', {
        unique: false
    })
})

function saveTeams(team) {
    dbPromised
        .then((db) => {
            let tx = db.transaction('teams', 'readwrite')
            let store = tx.objectStore('teams')
            console.log(team)
            store.add(team)
            return tx.complete
        })
        .then(() => {
            console.log('article berhasil disimpan.')
        })
}

function deleteTeams(club) {
    dbPromised
        .then((db) => {
            let tx = db.transaction('teams', 'readwrite')
            let store = tx.objectStore('teams')
            console.log(club)
            store.delete(club.id)
            return tx.complete
        })
        .then(() => {
            console.log('article berhasil dihapus.')
        })
}

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                const tx = db.transaction('teams', 'readonly')
                let store = tx.objectStore('teams')
                return store.getAll()
            })
            .then((teams) => {
                resolve(teams)
            })
    })
}
