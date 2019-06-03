const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const routes = require('./src/routes/routes')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 8797
const db = mongoose.connection

dotenv.config()

//connect db
mongoose.connect(process.env.DB_URL, { useNewURLParser: true}).then(() => console.log('DB connected!!'))
db.on('error', (err) => {
    console.log('DB connection error:', err.message)
})

app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(expressValidator())

app.use('/', routes)

app.use('/', (req, res) => {
    res.json({"mess": "Hello Would Van dep  ahihi!"})
})

app.listen(PORT, () => {
    console.log("Server started on http://localhost:"+PORT)
    console.log("Vân đẹp trai")
})

module.exports = app;

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))