const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());


app.post('/events', (req, res) => {
    console.log(req.body);
})

app.listen(4003, () => {
    console.log(`server running port number 4003`)
})