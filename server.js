const express = require('express');
const path = require('path');

const app = express()
app.use(express.static(`${__dirname}/browser`))
app.use('/dist', express.static(`${__dirname}/dist`))
app.get('/', (req, res, next)=> res.send('index.html'))

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`listening on port ${port}`))
