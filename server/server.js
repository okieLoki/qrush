require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const connectDB = require('./config/db')

// Connection to the database
connectDB()

// Static middleware for css rendering
app.use(express.static('public'))

// Template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

//Routes
app.use('/api/files', require('./routes/files'))
app.use('/files', require('./routes/show'))
app.use('/files/download', require('./routes/download'))

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})


