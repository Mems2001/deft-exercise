const {readJson, writeJson} = require('../data/dataHandler')
const users_file = "users.json"

function getUsers() {
    return readJson(users_file)
}

function addUser({username, password, role}) {
    const users = getUsers()

    for (let u of users) {
        if (u.username === username) {
            return undefined
        }
    }

    const newUser = {
        id: crypto.randomUUID(),
        username,
        password,
        role: role ?? "EMPLOYEE"
    }

    users.push(newUser)
    writeJson(users_file, users)

    return newUser
}

module.exports = {
    addUser
}