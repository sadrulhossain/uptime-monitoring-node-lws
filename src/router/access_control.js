// dependencies
const {verifyToken} = require("./handler/Token");

// module scaffolding
const access_control = {}

access_control.protocols = ['http', 'https']
access_control.accepted_methods = ['get', 'post', 'put', 'delete']

access_control.access_methods = {
    user: ['get', 'put', 'delete'],
    check: ['get', 'post', 'put', 'delete'],
}


access_control.verifyAccess = (access, headers, method, callback) => {
    if(!access_control.accepted_methods.includes(method) || !access_control.access_methods[access].includes(method)){
        verifyToken(headers, (verified) => {
            if(!verified){
                callback(403, {
                    message: 'Unauthorized access'
                })
            }
            callback(200, {
                message: 'Authorized access'
            })
        })
    }
}

// export module
module.exports = access_control