const { addUser } = require("../services/users.services")
const { hashPassword } = require("../../util/security")

function createUser (req, res) {
    try {
        let body = ""
        req.on("data", data => {
            body += data.toString()
        })

        req.on("end", () => {
            const {username, password, role} = JSON.parse(body)
            console.log(username)
            const newUser = addUser({username, password: hashPassword(password), role})

            if(!newUser) {
                res.writeHead(400, {"Content-Type": "application/json"})
                res.end(JSON.stringify({message: "The user alredy exists"}))
            } else {
                res.writeHead(201, { "Content-Type": "application/json" })
                res.end(JSON.stringify(newUser))
            }
        })
    } catch (error) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Something went wrong, contact any administrator" }));
    }
}

module.exports = {
    createUser
}