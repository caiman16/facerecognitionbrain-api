import express from "express";
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

import { handleRegister } from './controllers/register.js';
import { handleSignin } from "./controllers/signin.js";
import { handleProfileGet } from "./controllers/profile.js";
import { handleAPICall, handleImage } from "./controllers/image.js";

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '235primo',
        database : 'smart-brain'
    }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('App is online'); })
app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })
app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { handleAPICall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})
