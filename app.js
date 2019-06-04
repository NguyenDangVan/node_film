const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const routes = require('./src/routes/routes')
const mongoose = require('mongoose')

dotenv.config()
const app = express()
const PORT = process.env.PORT || 8797
const db = mongoose.connection;


//connect db
mongoose.connect(process.env.DB_URL, { useNewURLParser: true}).then(() => console.log('DB connected!!'))
db.on('error', (err) => {
    console.log('DB connection error:', err.message)
})

// config router
// var controllers = require(__dirname + '/src/controllers/login.js')

// app.use(controllers)

app.set('views', __dirname + '/src/views')
app.set('view engine', 'ejs')
app.use('/static', express.static(__dirname + '/public'))

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())

app.use('/', routes)

// app.use('/', (req, res) => {
//     res.json({"mess": "Hello Would Van dep  ahihi!"})
// })

app.listen(PORT, () => {
    console.log("Server started on http://localhost: " + PORT)
})

module.exports = app;

// const session = require('express-session')
// const MongoStore = require('connect-mongo')(session)

// app.use(session({
//     secret: 'work hard',
//     resave: true,
//     saveUninitialized: false,
//     store: new MongoStore({
//         mongooseConnection: db
//     })
// }))
