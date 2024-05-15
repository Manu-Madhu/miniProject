const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')
const { randomBytes } = require('crypto');
const { default: axios } = require("axios"); 0

const app = express();
app.use(bodyParser.json());
app.use(cors())

const posts = {}

app.get("/posts", (req, res) => {
    res.status(200).send(posts)
})

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id, title
    }


    await axios.post('http://localhost:4005/events', {
        type: "postCreated",
        data: {
            id,
            title
        }
    }).catch((err) => {
        console.log(err.message);
    });


    res.status(201).send(posts[id])
});

app.post('/events', (req, res) => {
    console.log(req.body.type)
    res.send({});
})

app.listen(4000, () => {
    console.log("port 4000 is listening now")
})