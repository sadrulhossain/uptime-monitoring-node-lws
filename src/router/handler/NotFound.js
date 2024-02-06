// dependencies

// module scaffolding
const handler = {}

handler.notFound = (request, callback) => {
    callback(404, {
        message: 'No module found'
    })
}

// export
module.exports = handler