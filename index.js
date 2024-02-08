// dependencies
const http = require('http')
const {handleReqRes} = require('./src/handler/handleReqRes')
const env = require('./src/env')
const data = require('./src/lib/data')

// app object - module scaffolding
const app = {}

// data testing
data.create('test', 'test-file-1', {
    name: 'Sadrul',
    age: 29,
    email: 'hossainsadrul@gmail.com',
}, (err) => {
    console.log('Error: ', err)
})

data.read('test', 'test-file-1', (err, data) => {
    if(!err && data){
        console.log(data)
    } else {
        console.log('Error: ', err)
    }
})
data.update('test', 'test-file-1', {
    name: 'Sadrul Hossain',
    age: 30,
    email: 'hossainsadrul@gmail.com',
}, (err) => {
    console.log('Error: ', err)
})
data.delete('test', 'test-file-1', (err) => {
    console.log('Error: ', err)
})


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