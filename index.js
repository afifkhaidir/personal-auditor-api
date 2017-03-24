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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/*==============
  Routes
================*/

/* create router instance */
const router = express.Router()

/* middleware */
router.use((req, res, next) => {
	console.log('Request coming')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
	next()
})

/* routes for /api/expense */
router.route('/expense')
  .get((req, res) => {
    Expense.find().sort({date: 'desc'}).exec()
      .then(expenses => res.json(expenses))
      .catch(err => res.json({ error: err }))
  })
  .post((req, res) => {
    var newExpense = new Expense()
    newExpense.name = req.body.name
    newExpense.amount = req.body.amount

    newExpense.save()
      .then(expense => res.json({ message: 'Expense added', expense: expense }))
      .catch(err => res.json({ error: err }))
  })

router.route('/expense/:expense_id')
  .get((req, res) => {
    Expense.findById(req.params.expense_id).exec()
      .then(expense => res.json(expense))
      .catch(err => res.json({ error: err }))
  })
  .put((req, res) => {
    Expense.findById(req.params.expense_id).exec()
      .then(expense => {
        expense.name = req.body.name
        expense.amount = req.body.amount

        return expense.save()
      })
      .then(expense => res.json({ success: true, message: 'Updated!', expense: expense }))
      .catch(err => res.json({ success: false, error: err }))
  })
  .delete((req, res) => {
    Expense.remove({ _id: req.params.expense_id }).exec()
      .then(status => res.json({ message: 'Deleted!', status: status }))
      .catch(err => res.json({ error: err }))
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