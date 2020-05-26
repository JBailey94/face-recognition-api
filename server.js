import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt';
import handleSignin from './controllers/signin.js';
import handleRegister from './controllers/register.js';
import handleProfileGet from './controllers/profile.js';
import { handleImage, handleApiCall } from './controllers/image.js';

// setup database connection using knex
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'Mary0623',
      database : 'face-recog'
    }
});

// creates the express application
const app = express();

// setup cors and body parser as middleware
app.use(bodyParser.json());
app.use(cors());

// dependency injection
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { handleApiCall(req, res)})

// create the listen port
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});