const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const Expense = require("./expense")
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://h:h@cluster1.q2sily3.mongodb.net/NewDBShr?retryWrites=true&w=majority', { useUnifiedTopology: true }).then(()=>{
    console.log("connected")
}).catch((err)=>{console.log(err)});

app.use(express.json())

app.get('/expense', async(req, res) =>{
    const result = await Expense.find()
    res.send(result)
})

app.delete('/expense/:id', async(req, res) =>{
    try{
    const id = req.params.id
    const result = await Expense.findByIdAndDelete(id)
    if(result) res.send(result)
    else res.send("No data")
    }
    catch(err) {res.send("err")}
    //const result = await Expense.find()
})

app.put('/expense/:id', async(req,res) =>{
    const id = req.params.id
    const updateObject = req.body
    await Expense.findByIdAndUpdate(id, {$set : updateObject}, {
        new:true
    })
    res.send(updateObject)
})

app.post('/expense', async (req,res) => {
    console.log(req.body)
    const newExpense = req.body
    await Expense.create(newExpense)
    res.send('created')
})

app.listen(port, ()=>{
    console.log(`Listening on ${port}`)
})