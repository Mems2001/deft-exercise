const { login } = require("../controllers/auth.controllers");

module.exports = {
    "/api/auth/login": {
        POST: login
    }
}