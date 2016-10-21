const express = require('express')
const port = process.env.PORT || 4000
const app = express()

const path = require('path')
const bodyParser = require('body-parser')


app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'lib')))
app.listen(port)

require('./config/routes')(app)

console.log('admin started on port ' + port);
