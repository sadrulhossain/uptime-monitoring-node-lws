// dependencies
const {sample} = require('./handler/Sample')
const {notFound} = require('./handler/NotFound')

// module scaffolding
const routes = {
    'sample': sample(),
}

// exports module
module.exports = routes