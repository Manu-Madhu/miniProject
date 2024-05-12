const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json())
app.use(cors());


const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
});

app.post('/events', (req, res) => {

    const { type, data } = req.body;

    if (type === "postCreated") {
        const { id, title } = data;

        posts[id] = { id, title, comments: [] }
    }
    if (type === "commentCreated") {
        const { id, content, postId } = data;
        const post = posts[postId];

        post.comments.push({ id, content });
    }

    res.send({})

})

app.listen(4003, () => {
    console.log('server port listening 4003')
})
