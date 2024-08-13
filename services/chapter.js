const {Chapter, Course} = require('../models')
const Validator = require('fastest-validator')
const {BadRequestError, NotFoundError} = require('../errors')
const v = new Validator()

const createChapter = async(req) => {
    const {name, course_id} = req.body

    const schema = {
        name: 'string|empty:false',
        course_id: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const course = await Course.findByPk(course_id)
    if(!course) throw new NotFoundError('course not found')

    const result = await Chapter.create({name, course_id})
    return result
}

const getAllChapter = async(req) => {
    const {course_id} = req.query
    const condition = {}

    if(course_id) condition['course_id'] = course_id

    const result = await Chapter.findAll({where: condition})
    return result
}

const getOneChapter = async(req) => {
    const result = await Chapter.findByPk(req.params.id)
    if(!result) throw new NotFoundError('chapter not found')

    return result
}

const updateChapter = async(req) => {
    const {name, course_id} = req.body

    const schema = {
        name: 'string|empty:false',
        course_id: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const chapter = await Chapter.findByPk(req.params.id)
    if(!chapter) throw new NotFoundError('chapter not found')

    const course = await Course.findByPk(course_id)
    if(!course) throw new NotFoundError('course not found')

    const result = await chapter.update({name, course_id})
    return result
}

const deleteChapter = async(req) => {
    const chapter = await Chapter.findByPk(req.params.id)
    if(!chapter) throw new NotFoundError('chapter not found')

    await chapter.destroy()
    return
}

module.exports = {createChapter, getAllChapter, getOneChapter, updateChapter, deleteChapter}