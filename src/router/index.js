// dependencies
const {sample} = require('./handler/Sample')
const {user} = require('./handler/User')

// module scaffolding
const routes = {
    'sample': sample,
    'user': user,
}

// exports module
module.exports = routes