const {createReview, deleteReview, updateReview} = require('../services/review')
const {StatusCodes} = require('http-status-codes')

const create = async(req, res, next) => {
    try {
        const result = await createReview(req)
        res.status(StatusCodes.CREATED).json({status: 'success', review: result})
    } catch (error) {
        next(error)
    }
}

const update = async(req, res, next) => {
    try {
        const result = await updateReview(req)
        res.status(StatusCodes.OK).json({status: 'success', review: result})
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deleteReview(req)
        res.status(StatusCodes.OK).json({status: 'success', message: 'review deleted successfully'})
    } catch (error) {
        next(error)
    }
}

module.exports = {create, update, destroy}