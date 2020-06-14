const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const path = require('path');

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

    var cors = require('cors')

    

const app = express()
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json())
app.use(cors())
app.use('/api/requests', require('./routes/api/requests'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))