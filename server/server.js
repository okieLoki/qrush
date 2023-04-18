require('dotenv').config()
const express = require('express')
const app = express();

const connectDB = require('./config/db')
connectDB()

//Routes
app.use('/api/files', require('./routes/files'))

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
})

//TYi3wPnXzaGAeCH1
//uddeeptaraajkashyap

