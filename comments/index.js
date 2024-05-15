const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors())

const commentsByPostId = {};

app.get('/post/:id/comments', (req, res) => {
    res.status(200).send(commentsByPostId[req.params.id] || [])
})

app.post('/post/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || [];
    comments.push({ id: commentId, content, status: "pending" });
    commentsByPostId[req.params.id] = comments;


    await axios.post('http://localhost:4005/events', {
        type: "commentCreated",
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: "pending"
        }
    }).catch((err) => {
        console.log(err.message);
    });

    res.status(201).send(comments)
});


app.post('/events', async (req, res) => {
    console.log(req.body.type);
    const { type, data } = req.body;

    if (type === "commentModerated") {
        const { id, postId, status, content } = data;
        const comments = commentsByPostId[postId];
        // const comment = comments.find(items => items?.id === id)
        const comment = comments.find((comment) => {
            return comment.id === id;
        });
        comment.status = status;

        console.log(status)
        await axios.post('http://localhost:4005/events', {
            type: "commentUpdated",
            data: {
                id,
                postId,
                status,
                content
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }
    res.send({});
})

app.listen(4001, () => {
    console.log("port 4001 is listening now")
})