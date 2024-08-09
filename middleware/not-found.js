const notFound = (req, res) => res.status(404).send({ status: 'error', message: 'Route dose not exist' })
module.exports = notFound