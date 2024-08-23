const midtransClient = require('midtrans-client');
const crypto = require('crypto');
const config = require('../config/config')['development']

const payment = async(parameter) => {
    // Create Snap API instance
    let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction : JSON.parse(config.midtransproduction),
        serverKey : config.midtransserverkey
    });

    return await snap.createTransaction(parameter)
}

const verifySignatureKey = async(data) => {
    const generatedSignature = crypto.createHash('sha512').update(`${data.order_id}${data.status_code}${data.gross_amount}${config.midtransserverkey}`).digest('hex')
    return generatedSignature === data.signature_key
}

module.exports = {payment, verifySignatureKey}