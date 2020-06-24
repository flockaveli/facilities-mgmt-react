const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
var cors = require('cors')
const path = require('path')
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

app.use(express.json())
app.use(cors())
app.use('/api/requests', require('./routes/api/requests'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('/*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))