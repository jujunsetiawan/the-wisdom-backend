const { UnauthenticatedError, UnauthorizedError } = require('../errors')
const { isTokenValid } = require('../utils')

const authenticatedUser = async(req, res, next) => {
    try {
        let token

        const authHeader = req.headers.authorization

        if(authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1]
        }

        if(!token) throw new UnauthenticatedError('authentication invalid')

        const payload = isTokenValid({ token })

        req.user = {
            userId: payload.userId,
            name: payload.name,
            email: payload.email,
            profession: payload.profession,
            role: payload.role
        }

        next()
    } catch (error) {
        next(error)
    }
}

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) throw new UnauthorizedError('unauthorized to access this route')
        next()
    }
}

module.exports = { authenticatedUser, authorizeRoles }