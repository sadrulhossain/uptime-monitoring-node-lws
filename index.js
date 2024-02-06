// dependencies
const http = require('http')
const {handleReqRes} = require('./src/handler/handleReqRes')

// app object - module scaffolding
const app = {}

// configuration
app.config = {
    port: 3005,
}

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes)
    server.listen(app.config.port, () => {
        console.log('Listening to port', app.config.port)
    })
}

// handle request response
app.handleReqRes = handleReqRes

// start server
app.createServer()