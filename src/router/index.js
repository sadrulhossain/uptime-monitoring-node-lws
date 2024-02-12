// dependencies
const {token} = require('./handler/Token')
const {user} = require('./handler/User')
const {check} = require('./handler/Check')

// module scaffolding
const routes = {
    'token': token,
    'user': user,
    'check': check,
}

// exports module
module.exports = routes