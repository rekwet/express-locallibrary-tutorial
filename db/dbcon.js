// mongoose sql ide for mongodb
// let mongoose = require('mongoose')
// // DB middleware setup
// // Set up default mongoose connection
// let mongoDB = 'mongodb://127.0.0.1/my_database'
// mongoose.connect(mongoDB)
// // Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise
// // Get the default connection
// let db = mongoose.connect
// // Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'))

let mongoose = require('mongoose')
let mongoDB = 'mongodb://dba:mongodbadmin1@ds137404.mlab.com:37404/lf_local_library'
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.Promise = global.Promise
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
