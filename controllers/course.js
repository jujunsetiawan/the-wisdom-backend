const {createCourse, updateCourse, getAllCourse, deleteCourse, getOneCourse} = require('../services/course')
const {StatusCodes} = require('http-status-codes')

const create = async(req, res, next) => {
    try {
        const result = await createCourse(req)
        res.status(StatusCodes.CREATED).json({status: 'success', course: result})
    } catch (error) {
        next(error)
    }
}

const index = async(req, res, next) => {
    try {
        const result = await getAllCourse(req)
        res.status(StatusCodes.OK).json({status: 'success', data: result})
    } catch (error) {
        next(error)
    }
}

const find = async(req, res, next) => {
    try {
        const result = await getOneCourse(req)
        res.status(StatusCodes.OK).json({status: 'success', course: result})
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const result = await updateCourse(req)
        res.status(StatusCodes.OK).json({status: 'success', course: result})
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deleteCourse(req)
        res.status(StatusCodes.OK).json({status: 'success', message: 'course deleted successfully'})
    } catch (error) {
        next(error)
    }
}

module.exports = {create, index, find, update, destroy}