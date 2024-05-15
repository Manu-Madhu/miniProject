const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());


const events = [];


app.post('/events', (req, res) => {
    const event = req.body;
    events.push(event)

    axios.post('http://localhost:4000/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:4001/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://localhost:4003/events', event).catch((err) => {
        console.log(err.message);
    });

    res.send({ status: "ok" })
});

app.get('/events', (req, res) => {
    try {
        res.send(events)
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(4005, () => {
    console.log("server listening port number 4005")
})