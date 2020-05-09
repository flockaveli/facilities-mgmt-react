const express = require('express')
const mongoose = require('mongoose')
const path = require('path');
const config = require('config')

const db = config.get('mongoURI')

mongoose
    .connect(
        db, { 
        useNewUrlParser: true,
        useCreateIndex: true
     })
    .then(() => console.log('MongoDB Connected'))
    .catch(e => {
        console.error('Connection error', e.message)
    })

    
    const apiPort = process.env.PORT || 5000;



const app = express()
app.use(express.json());

app.use('/api/requests', require('./routes/api/requests'))
app.use('/api/users', require('./routes/api/users'))

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))