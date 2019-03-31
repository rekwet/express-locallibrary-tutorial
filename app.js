let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

// Use Helmet to protect against well known vulnerabilities
let helmet = require('helmet')

// add database details to setup
// let dbInstance = require('./db/dbcon');

let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let catalogRouter = require('./routes/catalog') // Import routes for "catalog" area of site

let app = express()

// setup lusca - app security
let session = require('express-session')
let lusca = require('lusca')

// this or other session management will be required
app.use(session({
  secret: 'abc!20939@Fgdlkaouel',
  cookie: { httpOnly: true, secure: true },
  resave: true,
  saveUninitialized: true
}))

app.use(lusca({
  csrf: true,
  csp: { /* ... */},
  xframe: 'SAMEORIGIN',
  p3p: 'ABCDEF',
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  xssProtection: true,
  nosniff: true,
  referrerPolicy: 'same-origin'
}))

// use Helmet to activate the middelware and protect the app.
app.use(helmet())

// Set up mongoose connection
let mongoose = require('mongoose')
let mongoDB = 'mongodb://dba:mongodbadmin1@ds137404.mlab.com:37404/lf_local_library'
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// add middleware libraries
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// get Express to server all static files in the ./public dir
app.use(express.static(path.join(__dirname, 'public')))

// routes added to middleware stack
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/catalog', catalogRouter)

// add middleware handlers methods for errors and 404 responses
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// add app let to the exports module so we can import in /bin/www
module.exports = app
