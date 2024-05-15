const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res) => {
    const { type, data } = req.body

    if (type === "commentCreated") {
        const status = data?.content?.includes('orange') ? "Rejected" : "Approved"

        await axios.post('http://localhost:4005/events', {
            type: 'commentModerated',
            data: {
                id: data.id,
                postId: data.postId,
                content: data.content,
                status
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }
    res.send({})
})

app.listen(4003, () => {
    console.log(`server running port number 4003`)
})