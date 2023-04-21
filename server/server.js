require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const connectDB = require('./config/db')

// Connection to the database
connectDB()

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(express.json())

// Template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine());

//Routes
app.use('/api/files', require('./routes/files'))
app.use('/files', require('./routes/show'))
app.use('/files/download', require('./routes/download'))

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})


