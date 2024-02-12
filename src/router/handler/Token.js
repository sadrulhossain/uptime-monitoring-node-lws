// dependencies
const env = require('../../env')
const validator = require('../../validator')
const {validate} = require("./index");
// const data = require('../../lib/data')
const {parseJsonToObject, hash, generateRandomString} = require('../../utilities')
const {getUserById} = require('../handler/User')
const data = require("../../lib/data");

// module scaffolding
const handler = {}


handler.token = (request, callback) => {
    if(env.accepted_methods.includes(request.method)){
        handler._token[request.method](request, callback)
    } else {
        callback(405, {
            message: 'Unauthorized request'
        })
    }
}

// file info
handler._dir = 'tokens'
handler._file = 'token-data-'

// init request handlers
handler._token = {}

// handle get request
handler._token.get = (request, callback) => {
    let body = typeof (request.query_str_obj) === 'object' ? request.query_str_obj : {}
    const errors = handler._validateToken(body)

    // if error found
    if(errors.token.length > 0) {
        callback(400, {
            token: errors.token
        })
    }
    const file_name = handler._file + body.token
    data.read(handler._dir, file_name, (read_status_code, read_data) => {
        if(read_status_code === 200){
            let token = { ...parseJsonToObject(read_data.data) }
            callback(read_status_code, {
                data: token,
            })
        } else {
            callback(read_status_code, {
                message: read_data.data,
            })
        }
    })
}

// handle post request
handler._token.post = (request, callback) => {
    let body = typeof (request.body) === 'object' ? request.body : {}
    const errors = handler._validateStore(body)

    // if error found
    if(errors.length > 0) {
        callback(400, errors)
    }

    getUserById(request, (user_read_status_code, user_read_data) => {
        if(user_read_status_code !== 200){
            callback(user_read_status_code, {
                message: 'Phone or password mismatch',
            })
        }

        let user = {...parseJsonToObject(user_read_data.data)}

        if(user.password !== hash(body.password)){
            callback(405, {
                message: 'Phone or password mismatch',
            })
        }

        const token = generateRandomString(20)
        const expiry = Date.now + (60*60*1000)
        const token_obj = {
            phone: body.phone,
            token: token,
            expiry: expiry,
        }

        const file_name = handler._file + token
        data.create(handler._dir, file_name, body, (create_status_code, message) => {
            if(create_status_code !== 200){
                callback(500, {
                    message: 'Failed to generate token',
                })
            }
            callback(200, {
                data: token_obj
            })
        })

    })



}

// handle put request
handler._token.put = (request, callback) => {
    let body = typeof (request.body) === 'object' ? request.body : {}
    const errors = handler._validate(body)

    // if error found
    if(errors.token.length > 0) {
        callback(400, {
            token: errors.token
        })
    }

    const file_name = handler._file + body.token
    data.read(handler._dir, file_name, (read_status_code, read_data) => {
        if(read_status_code === 200){
            let token = { ...parseJsonToObject(read_data.data) }

            if(token.expiry <= Date.now){
                callback(401, {
                    message: 'Token is still valid',
                })
            }

            token.expiry = Date.now() + (60*60*1000)
            data.update(handler._dir, file_name, token, (update_status_code, message) => {
                callback(update_status_code, {
                    message: message,
                })
            })
        } else {
            callback(read_status_code, {
                message: data,
            })
        }
    })
}

// handle delete request
handler._token.delete = (request, callback) => {
    let body = typeof (request.query_str_obj) === 'object' ? request.query_str_obj : {}
    const errors = handler._validateToken(body)

    // if error found
    if(errors.token.length > 0) {
        callback(400, {
            token: errors.token
        })
    }

    const file_name = handler._file + body.token
    data.read(handler._dir, file_name, (read_status_code, data) => {
        if(read_status_code === 200){
            data.delete(handler._dir, file_name, (delete_status_code, message) => {
                callback(delete_status_code, {
                    message: message,
                })
            })
        } else {
            callback(read_status_code, {
                message: data,
            })
        }
    })
}

const verifyToken = (headers, callback) => {
    const token = typeof (headers.token) === 'string' ? headers.token : false;
    if(!token) callback(token)
    const file_name = handler._file + token
    data.read(handler._dir, file_name, (read_status_code, raed_data) => {
        if(read_status_code === 200){
            callback(true)
        } else {
            callback(false)
        }
    })
}

handler._validateStore = (body) => {
    const validation =  {
        phone: validator.with(body, 'phone')
            .type('string', '')
            .required('')
            .lenMatch(11, '')
            .get(),
        password: validator.with(body, 'password')
            .type('string', '')
            .required('')
            .get(),
    }

    return validate(validation)
}

handler._validateToken = (body) => {
    const validation =  {
        token: validator.with(body, 'token')
            .type('string', '')
            .required('')
            .get(),
    }

    return validate(validation)
}


// export
module.exports = handler