// dependencies
const url = require('url')
const {StringDecoder} = require('string_decoder')
const routes = require('../router/index')
const {notFound} = require('../router/handler/NotFound')

// module scaffolding
const handler = {}

// handle request response
handler.handleReqRes = (req, res) => {
    const parse_url = url.parse(req.url, true)
    const path = parse_url.pathname.replace(/^\/+\/+$/g, '')
    const query_str_obj = parse_url.query
    const headers = req.headers
    const method = req.method.toLowerCase()

    const request = {
        parse_url,
        path,
        query_str_obj,
        headers,
        method
    }

    const decoder = new StringDecoder('utf-8')
    let real_data = ''

    const handlePath = routes[path] ? routes[path]: notFound



    req.on('data', (buffer) => {
        real_data += decoder.write(buffer)
    })

    req.on('end', () => {
        real_data += decoder.end()

        handlePath(request, (status_code, payload) => {
            status_code = typeof(status_code) === 'number' ? status_code : 500
            payload = typeof(payload) === 'object' ? payload : {}
            payload = JSON.stringify(payload)

            res.writeHead(status_code)
            res.end(payload)
        })

        res.end('Hello World')
    })

}

// export module
module.exports = handler