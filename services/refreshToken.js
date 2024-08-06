const { BadRequestError, NotFoundError } = require('../errors')
const { Refreshtoken, User } = require('../models')
const Validator = require('fastest-validator')
const { isRefreshTokenValid, createJWT, createTokenUser } = require('../utils')
const v = new Validator()

const createRefreshToken = async(payload) => {
    const schema = {
        token: 'string|empty:false',
        user_id: 'number|empty:false'
    }

    const validate = v.validate(payload, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))
    
    const user = await User.findByPk(payload.user_id)
    if(!user) throw new NotFoundError('user not found')

    await Refreshtoken.destroy({where: {user_id: payload.user_id}})

    const result = await Refreshtoken.create(payload)
    return result
}

const getRefreshToken = async(req) => {
    const {refreshtoken, email} = req.params

    const result = await Refreshtoken.findOne({where: {token: refreshtoken}})
    if(!result) throw new NotFoundError('refresh token tidak valid')

    const payload = isRefreshTokenValid({token: result.token})
    if(payload.email !== email) throw new BadRequestError('invalid credential')

    const token = createJWT({payload: createTokenUser(payload)})
    return token
}

module.exports = {createRefreshToken, getRefreshToken}