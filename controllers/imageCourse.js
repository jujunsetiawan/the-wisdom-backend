const {createImageCourse, deleteImageCourse} = require('../services/imageCourse')
const {StatusCodes} = require('http-status-codes')

const create = async(req, res, next) => {
    try {
        const result = await createImageCourse(req)
        res.status(StatusCodes.CREATED).json({status: 'success', image: result})
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deleteImageCourse(req)
        res.status(StatusCodes.OK).json({status: 'success', message: 'image deleted successfully'})
    } catch (error) {
        next(error)
    }
}

module.exports = {create, destroy}