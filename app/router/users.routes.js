const { createUser } = require("../controllers/users.controllers");

module.exports = {
    "/api/users/create": {
        POST: createUser
    }
}