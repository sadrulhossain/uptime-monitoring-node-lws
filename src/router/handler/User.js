// dependencies
const env = require('../../env')
const validator = require('../../validator')

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
    const body = typeof (request.body) === 'object' ? request.body : {}
    handler._storeValidate(body, callback)
}

// handle put request
handler._user.put = (request, callback) => {

}

// handle delete request
handler._user.delete = (request, callback) => {

}

handler._storeValidate = (body, callback) => {
    const validation =  {
        first_name: validator.with(body, 'first_name')
            .type('string', '')
            .notNull('')
            .get(),
        last_name: validator.with(body, 'last_name')
            .type('string', '')
            .notNull('')
            .get(),
        phone: validator.with(body, 'phone')
            .type('string', '')
            .notNull('')
            .validMobile('')
            .get(),
        password: validator.with(body, 'password')
            .type('string', '')
            .notNull('')
            .get(),
    }

    handler._validate(validation, callback)
}

handler._validate = (validation, callback) => {
    let errors = {}
    for(let x in validation){
        if(validation[x].error) {
            errors[x] = validation[x].error_msg
        }
    }

    if(errors.length > 0) {
        callback(400, errors)
    }
}

// export
module.exports = handler