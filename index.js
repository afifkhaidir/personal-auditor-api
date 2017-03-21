/*==============
  Initialization
================*/

/* import package */
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

/* other variables */
const db = 'mongodb://auditor:auditor123@ds135800.mlab.com:35800/personal_auditor'

/* use es6 promise */
mongoose.Promise = global.Promise

/* import model */
const Expense = require('./models/expense')

/* create express instance */
const app = express()
const port = process.env.PORT || 8080

/*===============
  Configuration
=================*/

/* DB Connection string */
mongoose.connect(db, (err, db) => {
	if(err)
		console.log(err)
})

/* use body-parser in app */
app.use(bodyParser.urlencode({ extended: false }))
app.use(bodyParser.json())


/*==============
  Routes
================*/

/* create router instance */
const router = express.Router()

/* middleware */
router.use((req, res, next) => {
	console.log('Request coming')
	next()
})

/* routes for /api/expense */
router.route('/expense')
	  .get((req, res) => {
	  	res.json({ data: 'Welcome to Expense Auditor '})
	  })

/*===============
  Register Router
=================*/
app.get('/', (req, res) => res.send('Personal Auditor API'))
app.use('/api', router)


/*================
  Start The Server
==================*/
app.listen(port, () => {
	console.log('Server run on port: ' + port)
})