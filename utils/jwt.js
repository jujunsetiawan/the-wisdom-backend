const jwt = require('jsonwebtoken')
const config = require('../config/config')['development']

const createJWT = ({ payload }) => {
    const token = jwt.sign(payload, config.jwtsecret, {
        expiresIn: '7d'
    })

    return token
}

const createRefreshJWT = ({ payload }) => {
    const token = jwt.sign(payload, config.jwtRefreshSecret, {
        expiresIn: '30d'
    })

    return token
}


const isTokenValid = ({ token }) => jwt.verify(token, config.jwtsecret)
const isRefreshTokenValid = ({ token }) => jwt.verify(token, config.jwtRefreshSecret)

module.exports = { createJWT, createRefreshJWT, isTokenValid, isRefreshTokenValid }