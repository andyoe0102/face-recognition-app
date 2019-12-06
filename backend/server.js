const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: "pg",
    connection: process.env.POSTGRES_URI
//    {
//        host: process.env.POSTGRES_HOST,
//        user: process.env.POSTGRES_USER,
//        password: '',
//        password: process.env.POSTGRES_PASSWORD,
//        database: process.env.POSTGRES_DB
//    }
});


const app = express();

app.use(morgan('combined'))
app.use(bodyParser.json());
app.use(cors());



// const database={
//     users: [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'bananas',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login:[
//         {
//             id:'987',
//             hash: '',
//             email: 'john@gmail.com'
//         }
//     ]
// }



//app.get('/',(req,res)=>{res.send(database.users);})
app.get('/', (req, res) => { res.send("ITS WORKING"); })
app.post('/signin',(req,res) => {signin.handleSignin(req,res,db,bcrypt)})
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt) })
app.get('/profile/:id',(req,res) => {msWriteProfilerMark.handleProfileGet(req,res,db)})
app.post('/profile/:id', (req,res) => {profile.handleProfileUpdate(req,res,db)})
app.put('/image',(req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(3000,()=>{
    console.log('app is running on port 3000');
});