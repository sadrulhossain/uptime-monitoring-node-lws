// dependencies
const http = require('http')
const {handleReqRes} = require('./src/handler/handleReqRes')
const env = require('./src/env')

// app object - module scaffolding
const app = {}


// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes)
    server.listen(env.port, () => {
        console.log('Listening to port', env.port)
    })
}

// handle request response
app.handleReqRes = handleReqRes

// start server
app.createServer()