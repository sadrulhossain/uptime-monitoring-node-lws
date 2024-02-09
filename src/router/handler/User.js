// dependencies
const env = require('../../env')

// module scaffolding
const handler = {}

handler.user = (request, callback) => {
    if(env.accepted_methods.includes(request.method)){
        handler._user[request.method](request, callback)
    } else {
        callback(405, {
            message: 'Unauthorized request'
        })
    }
    // callback(200, {
    //     message: 'This is routing to user module'
    // })
}

// init request handlers
handler._user = {}

// handle get request
handler._user.get = (request, callback) => {

}

// handle post request
handler._user.post = (request, callback) => {

}

// handle put request
handler._user.put = (request, callback) => {

}

// handle delete request
handler._user.delete = (request, callback) => {

}

// export
module.exports = handler