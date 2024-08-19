const {Review, Course, User} = require('../models')
const Validator = require('fastest-validator')
const {BadRequestError, NotFoundError} = require('../errors')
const v = new Validator()

const createReview = async(req) => {
    const {user_id, course_id, ratting, note} = req.body

    const schema = {
        user_id: 'number|empty:false',
        course_id: 'number|empty:false',
        ratting: 'number|empty:false|min:1|max:5',
        note: 'string'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const course = await Course.findByPk(course_id)
    if(!course) throw new NotFoundError('course not found')

    const user = await User.findByPk(user_id)
    if(!user || user.role !== 'student') throw new NotFoundError('user not found')

    const isExistReview = await Review.findOne({where: {course_id, user_id}})
    if(isExistReview) throw new BadRequestError('review already exist')

    const result = await Review.create({user_id, course_id, ratting, note})
    return result
}

const updateReview = async(req) => {
    const {ratting, note} = req.body

    const schema = {
        ratting: 'number|empty:false|min:1|max:5',
        note: 'string'
    }

    const validate = v.validate(req.body, schema)
    if(validate.length) throw new BadRequestError(JSON.stringify(validate))

    const review = await Review.findByPk(req.params.id)
    if(!review) throw new NotFoundError('review not found')

    const result = await review.update({ratting, note})
    return result
}

const deleteReview = async(req) => {
    const review = await Review.findByPk(req.params.id)
    if(!review) throw new NotFoundError('review not found')

    await review.destroy()
    return
}

module.exports = {createReview, updateReview, deleteReview}