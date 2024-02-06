// dependencies

// module scaffolding
const handler = {}

handler.sample = (request, callback) => {
    callback(200, {
        message: 'This is routing to sample module'
    })
}

// export
module.exports = handler