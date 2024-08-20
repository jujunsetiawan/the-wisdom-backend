const {Mentor, Course, Review, MyCourse, Chapter, Lesson, User} = require('../models')
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
    const result = await Course.findOne({where: {id: req.params.id}, include: [{model: Chapter, as: 'chapter', include: [{model: Lesson, as: 'lesson'}]}, {model: Review, as: 'review', include: [{model: User, as: 'user', attributes: ['id', 'name', 'email', 'role', 'profession', 'avatar']}]}, {model: Mentor, as: 'mentor'}]})
    if(!result) throw new NotFoundError('course not found')

    const total_video = result.chapter.map(v => v.lesson.length).reduce((a, c) => a + c, 0)
    const total_student = await MyCourse.count({where: {course_id: req.params.id}})

    result.dataValues['total_video'] = total_video
    result.dataValues['total_student'] = total_student
    return result
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