const {getAllOrder, midtransWebhook} = require('../services/order')
const {StatusCodes} = require('http-status-codes')

const find = async(req, res, next) => {
    try {
        const result = await getAllOrder(req)
        res.status(StatusCodes.OK).json({status: 'success', order: result})
    } catch (error) {
        next(error)
    }
}

const webhook = async(req, res, next) => {
    try {
        await midtransWebhook(req)
        res.status(StatusCodes.OK).json({status: 'success', message: 'payment success'})
    } catch (error) {
        next(error)
    }
}

module.exports = {find, webhook}