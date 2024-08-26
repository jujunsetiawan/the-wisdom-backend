const { BadRequestError, NotFoundError } = require('../errors')
const { Media } = require('../models')
// const fs = require('fs')
const { uploadImage } = require('../utils/cdn')

const createImage = async(req) => {
    if(!req.file) throw new BadRequestError('please choose image')

    const form = new FormData()
    form.append('image', req.file.buffer.toString('base64'))

    const media = await uploadImage(form)

    const result = await Media.create({ media_name: media.id, media_url: media.url.substring(0, 16) + '.com' + media.url.substring(16)})
    return result
}

const getAllMedia = async(req) => {
    const result = await Media.findAll({ attributes: ['id', 'media_name', 'media_url']})
    return result
}

const deleteMedia = async(req) => {
    const { id } = req.params

    const media = await Media.findByPk(id)
    if(!media) throw new NotFoundError('media not found')

    // fs.unlink(`./public/${media.media_name}`, async(err) => {
    //     if(err) throw new BadRequestError(err.message)
    // })

    await media.destroy()
    return
}

module.exports = {createImage, getAllMedia, deleteMedia}