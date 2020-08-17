const express = require('express');
const PORT = require('./config/default.json')['development'].PORT
const db = require('./db')
const router = require('./router')
const cors = require('cors')

const app = express();

app.use(cors({ exposedHeaders: 'Authorization' }))
app.use(express.json())

app.use('/', router)


app.listen(PORT, () => {
    console.log(`Server Listening on the port ${PORT}`)
})