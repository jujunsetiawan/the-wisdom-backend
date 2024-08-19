const {MyCourse, Course, User} = require('../models')
const Validator = require('fastest-validator')
const {BadRequestError, NotFoundError} = require('../errors')
const v = new Validator()

const createMyCourse = async(req) => {
    const {course_id, user_id} = req.body

    const schema = {
        course_id: 'number|empty:false',
        user_id: 'number|empty:false'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const course = await Course.findByPk(course_id)
    if(!course) throw new NotFoundError('course not found')

    const user = await User.findByPk(user_id)
    if(!user) throw new NotFoundError('user not found')

    const isExistMyCourse = await MyCourse.findOne({where: {course_id, user_id}})
    if(isExistMyCourse) throw new BadRequestError('user already taken this course')

    const result = await MyCourse.create({course_id, user_id})
    return result
}

const getAllMyCourse = async(req) => {
    const {user_id} = req.query
    const condition = {}

    if(user_id) condition['user_id'] = user_id

    const myCourses = await MyCourse.findAll({where: condition, include: [{model: Course}]})
    const result = myCourses.map(myCourse => ({
        ...myCourse.toJSON(),
        course: myCourse.Course,
        Course: undefined
    }));

    return result
}

module.exports = {createMyCourse, getAllMyCourse}