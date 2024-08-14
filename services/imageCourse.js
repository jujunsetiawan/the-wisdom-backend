const {ImageCourse, Course} = require('../models')
const Validation = require('fastest-validator')
const {BadRequestError, NotFoundError} = require('../errors')
const v = new Validation()

const createImageCourse = async(req) => {
    const {image_name, image_url, course_id} = req.body

    const schema = {
        image_name: 'string|empty:false',
        image_url: 'string|empty:false',
        course_id: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const course = await Course.findByPk(course_id)
    if(!course) throw new NotFoundError('course not found')

    const result = await ImageCourse.create({image_name, image_url, course_id})
    return result
}

const deleteImageCourse = async(req) => {
    const imageCourse = await ImageCourse.findByPk(req.params.id)
    if(!imageCourse) throw new NotFoundError('image course not found')

    await imageCourse.destroy()
    return
}

module.exports = {createImageCourse, deleteImageCourse}