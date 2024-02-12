// dependencies
const env = require('../../env')
const validator = require('../../validator')
const data = require('../../lib/data')
const {parseJsonToObject, hash} = require('../../utilities')
const {validate} = require('./index')
const {verifyToken} = require('./Token')
const access_control = require('../access_control')
const {verifyAccess} = require("../access_control");

// module scaffolding
const handler = {}

handler._module_name = 'check'
handler._dir = 'checks'
handler._file = 'check-data-'

handler.check = (request, callback) => {
    // token verified module routing
    verifyAccess(handler._module_name, request.headers, request.method, (status_code, data) => {
        if(status_code !== 200) callback(status_code, data)
        handler._user[request.method](request, callback)
    })
}

// init request handlers
handler._check = {}

// handle get request
handler._check.get = (request, callback) => {}

// handle post request
handler._check.post = (request, callback) => {
    let body = typeof (request.body) === 'object' ? request.body : {}
    const errors = handler._validate(body)

    // if error found
    if(errors.length > 0) {
        callback(400, errors)
    }


}

// handle put request
handler._check.put = (request, callback) => {}

// handle delete request
handler._check.delete = (request, callback) => {}



handler._validate = (body) => {
    const validation =  {
        protocol: validator.with(body, 'protocol')
            .type('string', '')
            .required('')
            .inList(access_control.protocols, '')
            .get(),
        url: validator.with(body, 'url')
            .type('string', '')
            .required('')
            .get(),
        method: validator.with(body, 'protocol')
            .type('string', '')
            .required('')
            .inList(access_control.access_methods, '')
            .get(),
        success_codes: validator.with(body, 'success_codes')
            .type('object', '')
            .required('')
            .isArray('')
            .get(),
        timeout: validator.with(body, 'timeout')
            .type('number', '')
            .required('')
            .min(1, '')
            .max(10, '')
            .isModulas('')
            .get(),
    }

    return validate(validation)
}

// export
module.exports = handler