/* eslint-disable no-unused-vars */

import express from "express";
import cors from 'cors';
import * as dal from './dal.js' 


//const express = require('express');
//const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(cors());

//////////// ------------- Create User with DAL

app.get('/account/create/:name/:email/:password', function (req, res){
    // else create user
    const dalf = dal.createUser(req.params.name, req.params.email, req.params.password)
    .then( (user) => {
        console.log(user);
        res.send(user);
    } );
});


//////////// ------------- Create User withou DAL
/*
// create account
app.get('/account/create/:name/:email/:password', function (req, res){
    res.send({
        name: req.params.name,
        email: req.params.email,
        password: req.params.password
    })
});
*/

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

//////////// ------------- all accounts with DAL
// all accounts DAL

app.get('/account/all', function (req, res){
    const dalf = dal.all()
    .then( (docs) => {
        console.log(docs);
        res.send(docs);
    });
});



//////////// ------------- all accounts withou DAL
/*
// all accounts
app.get('/account/all', function (req, res){
    res.send({
        name: 'peter',
        email: 'peter@mit.edu',
        password: 'secret'
    })
});
*/

app.get("/api/v1/hello", (_req, res) => {
  res.json({ message: "Hello, world!" });
});


app.listen(3001, () => {
  console.log("Server listening on port", 3001);
});