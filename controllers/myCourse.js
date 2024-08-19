const {createMyCourse, getAllMyCourse} = require('../services/mycourse')
const {StatusCodes} = require('http-status-codes')

const create = async(req, res, next) => {
    try {
        const result = await createMyCourse(req)
        res.status(StatusCodes.CREATED).json({status: 'success', mycourse: result})
    } catch (error) {
        next(error)
    }
}

const index = async(req, res, next) => {
    try {
        const result = await getAllMyCourse(req)
        res.status(StatusCodes.OK).json({status: 'success', mycourse: result})
    } catch (error) {
        next(error)
    }
}

module.exports = {create, index}