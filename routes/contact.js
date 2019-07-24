let ContactModel = require('../models/schema/contact.model')
let express = require('express')
let router = express.Router()
let atob = require('atob')

// SECTION 1 : REST API
router.post('/contact', (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send('Request body is missing')
        return
    }
    var base64str = req.body.image_uri.substr(22)
    var decoded = atob(base64str)
    if (decoded.length > 30000) { // check file size not more than 50 kb
        res.status(400).send('Image cannot be more than 30KB')
        return
    } 

    let model = new ContactModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) res.status(500).send(doc)

            res.status(201).send(doc)
        })
        .catch(err => res.status(500).json(err))
})

router.get('/contact', (req, res) => {
    ContactModel.find().then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

router.get('/contact/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('Missing URL parameter id')
        return
    }

    ContactModel.findOne({
            _id: req.params.id,
        }).then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

// TODO: UPDATE API
router.put('/contact/:id', (req, res) => {
    if (!req.params.id) res.status(400).send('Missing URL parameter id')

    ContactModel.findOneAndUpdate({
        _id: req.params.id,
    }, req.body, {
        new: true,
    }).then(doc => res.json(doc))
      .catch(err => res.status(500).json(err))
})

router.delete('/contact/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).send('Missing URL parameter id')
        return
    }

    FeedbackModel.findOneAndDelete({
            _id: req.params.id,
        }).then(doc => res.json(doc))
        .catch(err => res.status(500).json(err))
})

module.exports = router