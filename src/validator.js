// dependencies

// module scaffolding
const validator = {
    field_name: null,
    field_type: null,
    body: {},
    error: false,
    error_msg: null,
    with(body, field_name) {
        this.field_name = field_name
        this.body = body
        return this
    },
    type(type, msg)  {
        this.field_type = type
        this.error = typeof (this.body[this.field_name]) !== type
        this.error_msg = this.error ? msg : null
        return this
    },
    isArray(msg) {
        this.error = !this.body[this.field_name] instanceof Array
        this.error_msg = this.error ? msg : null
        return this
    },
    isModulas(msg) {
        this.error = !this.body[this.field_name] % 1 !== 0
        this.error_msg = this.error ? msg : null
        return this
    },
    required (msg) {
        this.error = this.body[this.field_name].trim().length === 0
        this.error_msg = this.error ? msg : null
        return this
    },
    min(val, msg) {
        this.error = this.body[this.field_name].trim().length < val
        this.error_msg = this.error ? msg : null
        return this
    },
    max(val, msg) {
        this.error = this.body[this.field_name].trim().length > val
        this.error_msg = this.error ? msg : null
        return this
    },
    lenMatch(val, msg) {
        this.error = this.body[this.field_name].trim().length !== val
        this.error_msg = this.error ? msg : null
        return this
    },
    inList(list, msg) {
        this.error = !list.includes(this.body[this.field_name])
        this.error_msg = this.error ? msg : null
        return this
    },
    get() {
        return {
            error: this.error,
            error_msg: this.error_msg,
        }
    }

}


// export module
module.exports = validator