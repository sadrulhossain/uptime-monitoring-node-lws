// dependencies
const crypto = require('crypto')
const env = require('./env')

// module scaffolding
const utilities = {}

// parse json to object
utilities.parseJsonToObject = (json_str) => {
    let output = {}
    try {
        output = JSON.parse(json_str)
    } catch {
        output = {}
    }

    return output
}
// hash string
utilities.hash = (str) => {
    return (typeof (str) === 'string' && str.length > 0) ?
        crypto
            .createHmac('sha256', env.secret_key)
            .update(str)
            .digest('hex')
        : null
}

// generate random string
utilities.generateRandomString = (str_len) => {
    const len = typeof (str_len) === 'number' && str_len > 0 ? str_len : false
    if(!len){
        return false
    }

    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890.$ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let str = ''
    for(let i=0; i < len; i++){
        const char = chars.charAt(Math.floor(Math.random() * chars.length))
        str += char
    }
    return str
}

// export module
module.exports = utilities