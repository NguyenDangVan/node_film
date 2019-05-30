const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const app = express()
const PORT = process.env.PORT || 8797
const db = mongoose.connection

dotenv.config()

//connect db
mongoose.connect(process.env.DB_URL, { userNewURLParser: true}).then(() => console.log('DB connected!!'))
db.on('error', (err) => {
    console.log('DB connection error:', err.message)
})

app.use('/', (req, res) => {
    res.json({"mess": "Hello Would Van dep  ahihi!"})
})

app.listen(PORT, () => {
    console.log("Server started on http://localhost:"+PORT)
    console.log("Vân đẹp trai")
})

module.exports = app;
