const {createLesson, deleteLesson, getAllLesson, getOneLesson, updateLesson} = require('../services/lesson')
const {StatusCodes} = require('http-status-codes')

const create = async(req, res, next) => {
    try {
        const result = await createLesson(req)
        res.status(StatusCodes.CREATED).json({status: 'success', lesson: result})
    } catch (error) {
        next(error)
    }
}

const index = async(req, res, next) => {
    try {
        const result = await getAllLesson(req)
        res.status(StatusCodes.OK).json({status: 'success', lesson: result})
    } catch (error) {
        next(error)
    }
}

const find = async(req, res, next) => {
    try {
        const result = await getOneLesson(req)
        res.status(StatusCodes.OK).json({status: 'success', lesson: result})
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const result = await updateLesson(req)
        res.status(StatusCodes.OK).json({status: 'success', lesson: result})
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deleteLesson(req)
        res.status(StatusCodes.OK).json({status: 'success', messgae: 'lesson deleted successfully'})
    } catch (error) {
        next(error)
    }
}

module.exports = {create, index, find, update, destroy}