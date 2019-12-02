const {Router} = require('express')
// const axios = require('axios')
const router = Router()
const path = require("path")

const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: '64484726be7f439297f3fd5b91d0d78c'
})

// const {validationResult} = require('express-validator/check')

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Добавить фотографии',
        isAdd: 'true'
    })
})

router.post('/', async (req, res) => {
    console.log(req.files)
    // const errors = validationResult(req)
    // console.log(errors)
    // if (!errors.isEmpty()) {
    //     return res.status(422).render('add', {
    //         title: 'Добавить курс',
    //         isAdd: 'true',
    //         error: errors.array()[0].msg,
    //         data: {
    //             names: req.body.names
    //         }
    //     })
    // } 917852354494-1skta62iver3nrahhsod59aoutelseaj.apps.googleusercontent.com
    const files = req.files[0]
    try {
        let photoPath = path.resolve(__dirname, '..') + '/' + files.path
        photoPath = photoPath.replace(/\\/g, '/');
        console.log(photoPath)
        app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
          .then(generalModel => {
            return generalModel.predict(photoPath)
          })
          .then(response => {
            console.log('response')
            console.log(response)
            var concepts = response['outputs'][0]['data']['concepts']
            console.log(concepts)
          })
          .catch(error => console.log(error))
        
    } catch (error) {
        console.log(error)
    }
    
    res.redirect('/')
})


module.exports = router