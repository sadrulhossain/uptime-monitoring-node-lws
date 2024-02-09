// dependencies
const env = require('../../env')
const validator = require('../../validator')
const data = require('../../lib/data')
const {parseJsonToObject, hash} = require('../../utilities')

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
}

// file info
handler._dir = 'user'
handler._file = 'user-data-'

// init request handlers
handler._user = {}

// handle get request
handler._user.get = (request, callback) => {
    let body = typeof (request.query_str_obj) === 'object' ? request.query_str_obj : {}
    const errors = handler._validate(body)

    // if error found
    if(errors.phone.length > 0) {
        callback(400, {
            phone: errors.phone
        })
    }
    const file_name = handler._file + body.phone
    data.read(handler._dir, file_name, (read_status_code, data) => {
        if(read_status_code === 200){
            let user = { ...parseJsonToObject(data) }
            delete user.password
            callback(read_status_code, {
                data: user,
            })
        } else {
            callback(read_status_code, {
                message: data,
            })
        }
    })
}

// handle post request
handler._user.post = (request, callback) => {
    let body = typeof (request.body) === 'object' ? request.body : {}
    const errors = handler._validate(body)

    // if error found
    if(errors.length > 0) {
        callback(400, errors)
    }
    const file_name = handler._file + body.phone
    body['password'] = hash(body.password)
    data.read(handler._dir, file_name, (read_status_code, user) => {
        if(read_status_code === 401){
            data.create(handler._dir, file_name, body, (create_status_code, message) => {
                callback(create_status_code, {
                    message: message,
                })
            })
        } else {
            callback(401, {
                message: "File already exists",
            })
        }
    })


}

// handle put request
handler._user.put = (request, callback) => {
    let body = typeof (request.body) === 'object' ? request.body : {}
    const errors = handler._validate(body)

    // if error found
    if(errors.phone.length > 0) {
        callback(400, {
            phone: errors.phone
        })
    }

    body['password'] = hash(body.password)

    const file_name = handler._file + body.phone
    data.read(handler._dir, file_name, (read_status_code, data) => {
        if(read_status_code === 200){
            let user = { ...parseJsonToObject(data) }
            body = user.filter((key, val) => {
                if(!Object.keys(body).includes(key) || body[key] === null){
                    body[key] = val
                }
                return body
            })

            data.update(handler._dir, file_name, body, (update_status_code, message) => {
                callback(update_status_code, {
                    message: message,
                })
            })
            callback(read_status_code, {
                data: user,
            })
        } else {
            callback(read_status_code, {
                message: data,
            })
        }
    })
}

// handle delete request
handler._user.delete = (request, callback) => {
    let body = typeof (request.query_str_obj) === 'object' ? request.query_str_obj : {}
    const errors = handler._validate(body)

    // if error found
    if(errors.phone.length > 0) {
        callback(400, {
            phone: errors.phone
        })
    }

    const file_name = handler._file + body.phone
    data.read(handler._dir, file_name, (read_status_code, data) => {
        if(read_status_code === 200){
            data.update(handler._dir, file_name, (delete_status_code, message) => {
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

handler._validate = (body) => {
    const validation =  {
        first_name: validator.with(body, 'first_name')
            .type('string', '')
            .required('')
            .get(),
        last_name: validator.with(body, 'last_name')
            .type('string', '')
            .required('')
            .get(),
        phone: validator.with(body, 'phone')
            .type('string', '')
            .required('')
            .validMobile('')
            .get(),
        password: validator.with(body, 'password')
            .type('string', '')
            .required('')
            .get(),
    }

    let errors = {}
    for(let x in validation){
        if(validation[x].error) {
            errors[x] = validation[x].error_msg
        }
    }

    return errors
}

// export
module.exports = handler