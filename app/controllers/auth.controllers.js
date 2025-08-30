function login (req, res) {
    let body = ''
    req.on("data", data => {
        // console.log('raw-data:', data)
        body += data.toString()
    })

    req.on("end", () => {
        // console.log('body-data:',body)
        const {username, password} = JSON.parse(body)
        const token = "mock-token"

        //Set cookie
        res.writeHead(200, {
        "Content-Type": "application/json",
        "Set-Cookie": `auth_token=${token}; HttpOnly; Path=/; Max-Age=3600`
      });

        res.end(JSON.stringify({message: "success"}))
    })
}

module.exports = {
    login
}