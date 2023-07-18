import express from "express";
import cors from 'cors';

const app = express();

app.use(express.static('public'));
app.use(cors());

// create account
app.get('/account/create/:name/:email/:password', function (req, res){
    res.send({
        name: req.params.name,
        email: req.params.email,
        password: req.params.password
    })
});

// login user
app.get('/account/login/:email/:password', function (req, res){
    res.send({
        email: req.params.email,
        password: req.params.password
    })
});

// Deposit
// Whitdraw
// Balance

// all accounts
app.get('/account/all', function (req, res){
    res.send({
        name: 'peter',
        email: 'peter@mit.edu',
        password: 'secret'
    })
});

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});


app.listen(3001, () => {
  console.log("Server listening on port", 3001);
});