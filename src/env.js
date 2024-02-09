// dependencies

// module scaffolding
const env = {}

const accepted_methods = ['get', 'post', 'put', 'delete']

env.staging ={
    port: 3005,
    env_name: 'staging',
    secret_key: 'kdnswqasdkfkdldodmmd',
    accepted_methods: accepted_methods,
}
env.production ={
    port: 3009,
    env_name: 'production',
    secret_key: 'fdnegellsndksdlssskz',
    accepted_methods: accepted_methods,
}

const current_env = typeof process.env.APP_ENV === 'string' ? process.env.APP_ENV : 'staging'
const env_exp = typeof env[current_env] === 'object' ? env[current_env] : env.staging

// export module
module.exports = env_exp