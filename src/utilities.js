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

// export module
module.exports = utilities