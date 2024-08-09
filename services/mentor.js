const { Mentor } = require('../models')
const Validator = require('fastest-validator')
const { BadRequestError, NotFoundError } = require('../errors')
const v = new Validator()

const createMentor = async(req) => {
    const {name, email, profile, profession} = req.body
    
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        profile: 'string|empty:false',
        profession: 'string|empty:false'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const result = await Mentor.create({name, email, profile, profession})
    return result
}

const getAllMentor = async(req) => {
    const result = await Mentor.findAll({attributes: ['id', 'name', 'email', 'profile', 'profession']})
    return result
}

const getOneMentor = async(req) => {
    const result = await Mentor.findByPk(req.params.id)
    if(!result) throw new NotFoundError('mentor not found')

    return result
}

const updateMentor = async(req) => {
    const {id} = req.params
    const {name, email, profile, profession} = req.body

    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        profile: 'string|empty:false',
        profession: 'string|empty:false]'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const mentor = await Mentor.findByPk(id)
    if(!mentor) throw new NotFoundError('mentor not found')

    const result = await mentor.update({name, email, profile, profession})
    return result
}

const deleteMentor = async(req) => {
    const mentor = await Mentor.findByPk(req.params.id)
    if(!mentor) throw new NotFoundError('mentor not found')

    await mentor.destroy()
    return
}

module.exports = { createMentor, getAllMentor, getOneMentor, updateMentor, deleteMentor }