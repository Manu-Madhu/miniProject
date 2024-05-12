const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {};

app.get('/post/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || [])
})

app.post('/post/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events', {
        type: "commentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    }).then((res) => {
        console.log(res)
    }).catch((error) => {
        console.log(error)
    })

    res.status(201).send(comments)
});


app.post('/events', (req, res) => {
    console.log(req.body.type)
})

app.listen(4001, () => {
    console.log("port 4001 is listening now")
})