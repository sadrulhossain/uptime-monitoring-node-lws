// dependencies

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

// export module
module.exports = utilities