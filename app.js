if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(routes)
app.use(errorHandler)

// Untuk Jest
if (process.env.NODE_ENV === 'test') module.exports = app;
else app.listen(port, ()=>{ console.log(`your server run at http://localhost:${port}`)}) 

// for deploy
// app.listen(port, ()=>{
//     console.log(`your server run at http://localhost:${port}`)
// })