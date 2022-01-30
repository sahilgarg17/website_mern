const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cookieParser = require("cookie-parser");

dotenv.config({ path: './config.env' });
require("./db/conn");

app.use(express.json());
app.use(cookieParser());
app.use(require('./router/auth'));

const PORT = process.env.PORT;
const User = require("./model/userSchema");
//Middleware

// const middleware = (req, res, next) => {
//     console.log(`Hello middleware`);
//     next();
// }

app.get('/', (req, res) => {
    res.send(`Hello world by server`);
});

app.get('/contact', (req, res) => {
    res.send(`Hello Contact world by server`);
});

app.get('/signin', (req, res) => {
    res.send(`Hello Signin world by server`);
});

app.get('/signup', (req, res) => {
    res.send(`Hello Registration world by server`);
});


app.listen(PORT, () => {
    console.log(`server listens at port ${PORT}`);
})