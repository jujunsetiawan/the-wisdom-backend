const {createChapter, deleteChapter, getAllChapter, getOneChapter, updateChapter} = require('../services/chapter')
const {StatusCodes} = require('http-status-codes')

const create = async(req, res, next) => {
    try {
        const result = await createChapter(req)
        res.status(StatusCodes.CREATED).json({status: 'success', chapter: result})
    } catch (error) {
        next(error)
    }
}

const index = async(req, res, next) => {
    try {
        const result = await getAllChapter(req)
        res.status(StatusCodes.OK).json({status: 'success', chapter: result})
    } catch (error) {
        next(error)
    }
}

const find = async(req, res, next) => {
    try {
        const result = await getOneChapter(req)
        res.status(StatusCodes.OK).json({status: 'success', chapter: result})
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const result = await updateChapter(req)
        res.status(StatusCodes.OK).json({status: 'success', chapter: result})
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deleteChapter(req)
        res.status(StatusCodes.OK).json({status: 'success', message: 'chapter deleted successfully'})
    } catch (error) {
        next(error)
    }
}

module.exports = {create, index, find, update, destroy} 