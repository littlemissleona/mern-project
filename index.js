const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const User = require('./models/User');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
//.then(()=> console.log("connected to mongoDB"));

const app = express();

//Parse URL-encoded bodies (as sent by html forms)
app.use (express.urlencoded({extended: true}));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

//app.get('/', (req, res)=> {
//     // const user = new User({
//     //     email: "example@example.com",
//     //     password: "password123"
//     // })
//     // await user.save();
//     //res.send({someText: "Hello"});
//     res.status(200).json({someText: "Hello"})
//});
app.post('/register', async(req, res)=>{
    // console.log(req.body);
    // const user = new User(req.body);
    const user = new User(req.body);
    await user.save();
    res.status(200).json({
        message: 'Form data received'
    })
})

app.get('/registered', (req, res)=>{
    console.log("loading registered")
    res.status(200).json({
        message: 'User registered',
        user: 'new user'
    })
})
//extension: sort out routes
// require('./')(app);
// require('./routes/register')(app);
// require('./routes/registered')(app);

//before deploy fullstack to heroku
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    const path = require('path');
    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
//in production use heroku PORT, in development use 5000

app.listen(PORT);

// const user = new User({
//     email: "example@example.com",
//     password: "password123"
// })
// user.save();