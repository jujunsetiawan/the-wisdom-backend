const { User, Refreshtoken } = require('../models')
const bcrypt = require('bcryptjs')
const Validator = require('fastest-validator')
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../errors')
const { createJWT, createTokenUser, createRefreshJWT } = require('../utils')
const { createRefreshToken } = require('./refreshToken')
const v = new Validator()

const register = async(req) => {
    const { name, email, password, confirm_password, profession } = req.body

    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    // const user = await User.findOne ({where: {email}})
    // if(user) throw new BadRequestError('email already exist')

    if(password !== confirm_password) throw new BadRequestError('password and password confirmation do not match')
    const hash_password = await bcrypt.hash(password, 10)

    const result = await User.create({ name, email, password: hash_password, profession, role: 'student' })
    delete result.dataValues.password

    const token = createJWT({payload: createTokenUser(result)})
    const refresToken = createRefreshJWT({payload: createTokenUser(result)})

    await createRefreshToken({token: refresToken, user_id: result.id})
    return {token, refresToken, user: result}
}

const login = async(req) => {
    const {email, password} = req.body
    const schema = {email: 'email|empty:false', password: 'string|min:6'}

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const result = await User.findOne({where: {email}})
    if(!result) throw new UnauthorizedError('invalid credential')

    const isPasswordCorrect = await bcrypt.compare(password, result.password)
    if(!isPasswordCorrect) throw new UnauthorizedError('invalid credential')

    delete result.dataValues.password

    const token = createJWT({payload: createTokenUser(result)})
    const refresToken = createRefreshJWT({payload: createTokenUser(result)})
    
    await createRefreshToken({token: refresToken, user_id: result.id})
    return {token, refresToken, user: result}
}

const getProfile = async(req) => {
    const result = await User.findOne({where: {id: req.user.userId}})
    if(!result) throw new NotFoundError('user not found')

    delete result.dataValues.password
    return result
}

const updateProfile = async(req) => {
    const { name, email, profession, avatar } = req.body

    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        profession: 'string|optional',
        avatar: 'string|optional'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const user = await User.findByPk(req.user.userId)
    if(!user) throw new NotFoundError('user not found')

    if(email) {
        const checkEmail = await User.findOne({where: {email}})
        if(checkEmail && email !== user.email) throw new BadRequestError('email already exist')
    }

    const result = await user.update({name, email, profession, avatar})
    delete result.dataValues.password

    return result
}

const getOneUser = async(req) => {
    const result = await User.findByPk(req.params.id, {attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']})
    if(!result) throw new NotFoundError('user nott found')

    return result
}

const getAllUser = async(req) => {
    const result = await User.findAll({attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']})
    return result
}

// const logout = async(req) => {
//     const result = await Refreshtoken.destroy({where: {user_id: req.user.userId}})
//     return result
// }

module.exports = { register, login, getProfile, updateProfile, getOneUser, getAllUser }