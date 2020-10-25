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
            store.add(team.result)
            return tx.complete
        })
        .then(() => {
            console.log('article berhasil disimpan.')
        })
}

function getAll() {
    return new dbPromised((resolve, reject) => {
        dbPromised
            .then((db) => {
                const tx = db.transaction('teams', 'readwrite')
                let store = tx.objectStore('teams')
                return store.getAll()
            })
            .then((teams) => {
                resolve(teams)
            })
    })
}
