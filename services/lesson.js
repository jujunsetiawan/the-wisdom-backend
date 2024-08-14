const {Lesson, Chapter} = require('../models')
const Validator = require('fastest-validator')
const {BadRequestError, NotFoundError} = require('../errors')
const v = new Validator()

const createLesson = async(req) => {
    const {name, video, chapter_id} = req.body

    const schema = {
        name: 'string|empty:false',
        video: 'string|empty:false',
        chapter_id: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const chapter = await Chapter.findByPk(chapter_id)
    if(!chapter) throw new NotFoundError('chapter not found')

    const result = await Lesson.create({name, video, chapter_id})
    return result
}

const getAllLesson = async(req) => {
    const {chapter_id} = req.query
    const condition = {}

    if(chapter_id) condition['chapter_id'] = chapter_id

    const result = await Lesson.findAll({where: condition})
    return result
}

const getOneLesson = async(req) => {
    const result = await Lesson.findByPk(req.params.id)
    if(!result) throw new NotFoundError('lesson not found')

    return result
}

const updateLesson = async(req) => {
    const {name, video, chapter_id} = req.body

    const schema = {
        name: 'string|empty:false',
        video: 'string|empty:false',
        chapter_id: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const lesson = await Lesson.findByPk(req.params.id)
    if(!lesson) throw new NotFoundError('lesson not found')

    const chapter = await Chapter.findByPk(chapter_id)
    if(!chapter) throw new NotFoundError('chapter not found')

    const result = await lesson.update({name, video, chapter_id})
    return result
}

const deleteLesson = async(req) => {
    const lesson = await Lesson.findByPk(req.params.id)
    if(!lesson) throw new NotFoundError('lesson not found')

    await lesson.destroy()
    return
}

module.exports = {createLesson, getAllLesson, getOneLesson, updateLesson, deleteLesson}