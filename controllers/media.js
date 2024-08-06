const { createImage, getAllMedia, deleteMedia } = require('../services/media')
const { StatusCodes } = require('http-status-codes')

const image = async(req, res, next) => {
    try {
        const result = await createImage(req)
        res.status(StatusCodes.CREATED).json({ status: 'success', media: result })
    } catch (error) {
        next(error)
    }
}

const index = async(req, res, next) => {
    try {
        const result = await getAllMedia(req)
        res.status(StatusCodes.OK).json({ status: 'success', media: result })
    } catch (error) {
        next(error)
    }
}

const destroy = async(req, res, next) => {
    try {
        await deleteMedia(req)
        res.status(StatusCodes.OK).json({ status: 'success', message: 'media deleted successfully' })
    } catch (error) {
        next(error)
    }
}

module.exports = { image, index, destroy }