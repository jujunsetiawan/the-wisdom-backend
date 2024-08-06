const { BadRequestError, NotFoundError } = require('../errors')
const { Media } = require('../models')
const fs = require('fs')
const config = require('../config/config')['development']

const createImage = async(req) => {
    if(!req.file) throw new BadRequestError('please choose image')
    const result = await Media.create({ media_name: `images/${req.file.filename}`, media_url: `${config.base_url}/images/${req.file.filename}` })
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

    fs.unlink(`./public/${media.media_name}`, async(err) => {
        if(err) throw new BadRequestError(err.message)
    })

    await media.destroy()
    return
}

module.exports = {createImage, getAllMedia, deleteMedia}