const express = require('express')
const port = process.env.PORT || 8080
const app = express()
const log4js = require('log4js')

const path = require('path')
const bodyParser = require('body-parser')
const logger = log4js.getLogger("work")

/* 全局访问 */
global.Conf = require('./conf')
global.log4js = log4js, log4js.configure(Conf.log.log4js)

/* 日志 */
logger.setLevel('warn')
app.use(log4js.connectLogger(logger))


app.set('views', './app/views/pages')
app.set('view engine', 'jade')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'lib')))
app.listen(port)

require('./config/routes')(app)

console.log('admin started on port ' + port);
