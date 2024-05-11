const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());


app.listen(4002, () => {
    console.log("server listening port number 4002")
})