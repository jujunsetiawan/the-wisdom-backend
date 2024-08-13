const {Mentor, Course} = require('../models')
const Validator = require('fastest-validator')
const {BadRequestError, NotFoundError} = require('../errors')
const { Op } = require('sequelize')
const v = new Validator()

const createCourse = async(req) => {
    const {name, certificate, thumbnail, type, status, price, level, mentor_id, description} = req.body

    const schema = {
        name: {type: 'string', empty: false},
        certificate: {type: 'boolean', empty: false},
        thumbnail: 'string',
        type: {type: 'string', enum: ['free', 'premium'], empty: false},
        status: {type: 'string', enum: ['draft', 'published'], empty: false},
        price: {type: 'number', empty: false},
        level: {type: 'string', enum: ['beginner', 'intermediate', 'advance'], empty: false},
        mentor_id: {type: 'number', empty: false},
        description:  'string'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const mentor = await Mentor.findByPk(mentor_id)
    if(!mentor) throw new NotFoundError('mentor not found')

    const result = await Course.create({name, certificate, thumbnail, type, status, price, level, mentor_id, description})
    return result
}

const getAllCourse = async(req) => {
    const {page, limit} = req.pagination
    const {keyword, type, status, level} = req.query
    const condition = {}

    if(keyword) condition['name'] = {[Op.like]: `%${keyword}%`}
    if(type) condition['type'] = type
    if(status) condition['status'] = status
    if(level) condition['level'] = level

    const {count, rows} = await Course.findAndCountAll({where: condition, limit: Number(limit), offset: (Number(page) - 1) * Number(limit)})
    const totalPage = Math.ceil(count/Number(limit))

    return {course: rows, page: totalPage, total: count}
}

const getOneCourse = async(req) => {

}

const updateCourse = async(req) => {
    const {id} = req.params
    const {name, certificate, thumbnail, type, status, price, level, mentor_id, description} = req.body
    
    const schema = {
        name: {type: 'string', empty: false},
        certificate: {type: 'boolean', empty: false},
        thumbnail: 'string',
        type: {type: 'string', enum: ['free', 'premium'], empty: false},
        status: {type: 'string', enum: ['draft', 'published'], empty: false},
        price: {type: 'number', empty: false},
        level: {type: 'string', enum: ['beginner', 'intermediate', 'advance'], empty: false},
        mentor_id: {type: 'number', empty: false},
        description:  'string'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const course = await Course.findByPk(id)
    if(!course) throw new NotFoundError('course not found')

    const mentor = await Mentor.findByPk(mentor_id)
    if(!mentor) throw new NotFoundError('mentor not found')

    const result = await course.update({name, certificate, thumbnail, type, status, price, level, description})
    return result
}

const deleteCourse = async(req) => {
    const course = await Course.findByPk(req.params.id)
    if(!course) throw new NotFoundError('course not found')

    await course.destroy()
    return
}

module.exports = {createCourse, getAllCourse, getOneCourse, updateCourse, deleteCourse}