const express = require('express');
const app = express();

app.get('/', (req, res)=> {
    res.send({ someText: "hello" });
});

const PORT = process.env.PORT || 5000;
//in production use heroku PORT, in development use 5000

app.listen(PORT);