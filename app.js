const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')

const app = express();
app.use(cors())

const v1 = '/api/v1'

const indexRouter = require('./routes/index');
const mediaRouter = require('./routes/media');
const userRouter = require('./routes/user');
const refreshtokenRouter = require('./routes/refreshtoken')
const mentorRouter = require('./routes/mentor')
const courseRouter = require('./routes/course')

const notFoundMiddleware = require('./middleware/not-found')
const handleErrorMiddleware = require('./middleware/handle-error');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(v1, indexRouter);
app.use(`${v1}/media`, mediaRouter);
app.use(`${v1}/user`, userRouter);
app.use(`${v1}/refreshtoken`, refreshtokenRouter);
app.use(`${v1}/mentor`, mentorRouter);
app.use(`${v1}/course`, courseRouter);

app.use(notFoundMiddleware)
app.use(handleErrorMiddleware)

module.exports = app;
