const { BadRequestError } = require("../errors");

const paginationMiddleware = async(req, res, next) => {
    try {
        // Mengambil dan mengonversi page dan limit dari query string
        const page = parseInt(req.query.page ?? 1);
        const limit = parseInt(req.query.limit ?? 10);

        // Validasi page dan limit
        if (isNaN(page) || page <= 0) throw new BadRequestError('Invalid page number. It must be a positive integer.')
        if (isNaN(limit) || limit <= 0) throw new BadRequestError('Invalid limit number. It must be a positive integer.')

        // Menyimpan page dan limit dalam req untuk digunakan di middleware berikutnya atau route handler
        req.pagination = { page, limit };
        next();
    } catch (error) {
        next(error)
    }
}

module.exports = paginationMiddleware