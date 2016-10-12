const express = require('express')
const path = require('path')
const port = process.env.PORT || 4000
const app = express()

app.set('views', './views/pages')
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'lib')))
app.listen(port)

require('./config/routes')(app)

console.log('admin started on port ' + port);
