require('dotenv').config()
let express = require('express')
let cors = require('cors');
let app = express()
let bodyParser = require('body-parser')

require('./models/init')

let contact_route = require('./routes/contact')

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
    console.log(`${new Date()} => ${req.originalUrl}`, req.body)
    next()
})

app.use(contact_route)

app.get('/', (req, res) => res.send('Hi welcome to contact API'))

app.use((req, res, next) => {
    res.status(404).send('We think you are lost')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server is listening to ${PORT}`))