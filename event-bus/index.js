const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());


app.post('/events', (req, res) => {
    const event = req.body;
    console.log(event)
    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)
})


app.listen(4005, () => {
    console.log("server listening port number 4005")
})