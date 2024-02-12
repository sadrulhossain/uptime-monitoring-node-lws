// dependencies

// module scaffolding
const validator = require("../../validator");
const env = require("../../env");
const handler = {}

// handler.handler = (request, callback) => {
//
// }

handler.validate = (validation) => {
    let errors = {}
    if(validation.length > 0){
        for(let x in validation){
            if(validation[x].error) {
                errors[x] = validation[x].error_msg
            }
        }
    }

    return errors
}
// export
module.exports = handler