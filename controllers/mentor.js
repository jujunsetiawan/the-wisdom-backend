const {createMentor, updateMentor, getAllMentor, getOneMentor, deleteMentor} = require('../services/mentor')
const {StatusCodes} = require('http-status-codes')

const create = async(req, res, next) => {
    try {
        const result = await createMentor(req)
        res.status(StatusCodes.CREATED).json({status: 'success', mentor: result})
    } catch (error) {
        next(error)
    }
}

const index = async(req, res, next) => {
    try {
        const result = await getAllMentor(req)
        res.status(StatusCodes.OK).json({status: 'success', mentor: result})
    } catch (error) {
        next(error)
    }
}

const find = async(req, res, next) => {
    try {
        const result = await getOneMentor(req)
        res.status(StatusCodes.OK).json({status: 'success', mentor: result})
    } catch (error) {
        next(error)   
    }
}

const update = async(req, res, next) => {
    try {
        const result = await updateMentor(req)
        res.status(StatusCodes.OK).json({status: 'success', mentor: result})
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deleteMentor(req)
        res.status(StatusCodes.OK).json({status: 'success', message: 'mentor deleted successfully'})
    } catch (error) {
        next(error)
    }
}

module.exports = {create, index, find, update, destroy}