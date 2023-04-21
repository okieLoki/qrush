const router = require('express').Router()
const multer = require('multer') 
const path = require('path')
const File = require('../models/file')
const { v4: uuidv4 } = require('uuid');
const { default: convertSize } = require("convert-size");
require('dotenv').config()

let storage = multer.diskStorage({
    destination: (req, file, callback) => callback(
        null, 'uploads/'
    ),
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`
        callback(null, uniqueName)
    }
})

let upload = multer({
    storage: storage,
    limits: {fileSize: 1000000 * 100}
}).single('myfile')

router.post('/', (req, res)=>{
    // store file
    upload(req, res, async (err)=>{
        if(err){
            return res.status(500).send({
                error: err.message
            })
        }
        // store into database
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        })

        const response = await file.save()
        return res.json({
            file: `${process.env.APP_BASE_URL}/files/${response.uuid}`
        })
    })
})

router.post('/send', async (req, res)=>{
    const {uuid, emailTo, emailFrom} = req.body
    
    //validate
    if(!uuid || !emailTo || !emailFrom){
        console.warn('uuid or email not found');
        return res.status(422).send({
            error : "All fields are required"
        })
    }

    //get data from database
    const file = await File.findOne({uuid: uuid})

    if(file.sender){
        console.warn('Aleady sent');
        return res.status(422).send({
            error : "All fields are required"
        })
    }

    file.sender = emailFrom
    file.receiver = emailTo

    const response = await file.save();

    //Send email
    const sendMail = require('../services/emailServices')
    sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'QRush File Sharing',
        text: `${emailFrom} shared a file with you`,
        html: require('../services/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: 1234,
            expires: '5 Hours'
        })
    })

    return res.send({
        success: true
    })
})

module.exports = router