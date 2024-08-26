const config = require('../config/config')['development']

const uploadImage = async(form) => {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${config.imgbbapikey}`, {
        method: 'POST',
        body: form
    })

    const {data} = await response.json()
    return data
}

module.exports = {uploadImage}