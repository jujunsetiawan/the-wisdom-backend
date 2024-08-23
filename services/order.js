const {Order, PaymentLog, MyCourse} = require('../models')
const {BadRequestError, NotFoundError} = require('../errors')
const {payment, verifySignatureKey} = require('../utils/paymentGateway')

const createOrder = async(course, user) => {
    const metadata = {
        course_id: course.id,
        course_price: course.price,
        course_name: course.name,
        course_thumbnail: course.thumbnail,
        course_level: course.level
    }

    const order = await Order.create({status: 'pending', course_id: course.id, user_id: user.id, snap_url: '', metadata})

    const midtransParams = {
        "transaction_details": {
            "order_id": order.id,
            "gross_amount": course.price
        },
        "credit_card":{
            "secure" : true
        },
        "item_details": {
            "id": course.id,
            "price": course.price,
            "quantity": 1,
            "name": course.name,
            "brand": "Jun Dev",
            "category": "Online Course"
        },
        "customer_details": {
            "first_name": user.name,
            "email": user.email
        }
    }

    const {redirect_url, token} = await payment(midtransParams)

    const result = await order.update({status: 'pending', course_id: course.id, user_id: user.id, snap_url: redirect_url, metadata})
    return result
}

const getAllOrder = async(req) => {
    const {user_id} = req.query
    const condition = {}

    if(user_id) condition['user_id'] = user_id

    const result = await Order.findAll({where: condition})
    return result
}

const midtransWebhook = async(req) => {
    const notification = req.body;

    const order = await Order.findByPk(notification.order_id)
    if(!order) throw new NotFoundError('order not found')

    // Verifikasi signature
    if(!verifySignatureKey(notification)) throw new BadRequestError('Invalid signature')
    
    if (notification.transaction_status == 'capture' && notification.fraud_status == 'accept') {
        await order.update({...order, status: 'success'})
        await MyCourse.create({course_id: order.course_id, user_id: order.user_id})
    }
    if (notification.transaction_status == 'settlement') {
        await order.update({...order, status: 'success'})
        await MyCourse.create({course_id: order.course_id, user_id: order.user_id})
    }
    if (['cancel', 'deny', 'expire'].includes(notification.transaction_status)) await order.update({...order, status: 'failure'})
    if (notification.transaction_status == 'pending') await order.update({...order, status: 'pending'})

    await PaymentLog.create({status: notification.transaction_status, raw_response: notification, order_id: order.id, payment_type: notification.payment_type})
    return
}

module.exports = {createOrder, getAllOrder, midtransWebhook} 