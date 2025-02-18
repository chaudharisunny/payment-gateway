const express = require('express')
const app = express()
const dotenv=require('dotenv')
dotenv.config()
const port=process.env.port
const db=require('./model/db')
const indexRouter=require('./routes/index')

app.use(express.json())
app.use('/',indexRouter)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))