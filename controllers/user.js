const { register, login, getProfile, updateProfile, getOneUser, getAllUser } = require('../services/user')
const { StatusCodes } = require('http-status-codes')

const signup = async(req, res, next) => {
    try {
        const result = await register(req)
        res.status(StatusCodes.CREATED).json({ status: 'success', token: result })
    } catch (error) {
        next(error)
    }
}

const signin = async(req, res, next) => {
    try {
        const result = await login(req)
        res.status(StatusCodes.OK).json({ status: 'success', data: result })
    } catch (error) {
        next(error)
    }
}

const index = async(req, res, next) => {
    try {
        const result = await getAllUser(req)
        res.status(StatusCodes.OK).json({status: 'success', user: result})
    } catch (error) {
        next(error)
    }
}

const find = async(req, res, next) => {
    try {
        const result = await getOneUser(req)
        res.status(StatusCodes.OK).json({status: 'success', user: result})
    } catch (error) {
        next(error)
    }
}

const profile = async(req, res, next) => {
    try {
        const result = await getProfile(req)
        res.status(StatusCodes.OK).json({status: 'success', user: result})
    } catch (error) {
        next(error)
    }
}

const editprofile = async(req, res, next) => {
    try {
        const result = await updateProfile(req)
        res.status(StatusCodes.OK).json({status: 'success', user: result})
    } catch (error) {
        next(error)
    }
}

module.exports = { signup, signin, profile, editprofile, find, index }