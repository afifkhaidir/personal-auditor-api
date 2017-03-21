/*===================
  Expenses data model
=====================*/

/* initialization */
const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* define schema */
const expenseSchema = new Schema({
	name: String,
	amount: Number,
	date: { type: Date, default: Date.now }
})

/* export the model */
module.export = mongoose.model('Expense', expenseSchema)