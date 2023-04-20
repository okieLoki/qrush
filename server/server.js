require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')

const connectDB = require('./config/db')
connectDB()

// Template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

//Routes
app.use('/api/files', require('./routes/files'))
app.use('/files', require('./routes/show'))

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})


