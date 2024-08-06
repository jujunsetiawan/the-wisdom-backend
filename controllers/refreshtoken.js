const {getRefreshToken} = require('../services/refreshToken')
const {StatusCodes} = require('http-status-codes')

const find = async(req, res, next) => {
    try {
        const token = await getRefreshToken(req)
        res.status(StatusCodes.OK).json({status: 'success', token})
    } catch (error) {
        next(error)
    }
}

module.exports = {find}