const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const user = require('./userModel');
const jwt = require('jsonwebtoken');
db();
 
app.use(cors());
app.use(bodyParser.json());
const SECRET_KEY = "MYSECretKey";

const data = 
app.get('/api', (req, res) => {
  
    fetch('https://jsonplaceholder.typicode.com/users').
    then(res => res.json()).
    then(data => res.send(data)).catch(err => console.log(err));
    ;});
   


const signup = async (req, res) => {
     
    const {username,password} = req.body;

    try{
        const existingUser = await user.findOne({username});
        if(existingUser){
            return res.status(400).json({message:"user already exists"});
        }

        const newUser = await user.create({username:username,password:password});

        const token = jwt.sign({username:username,id:newUser._id},SECRET_KEY);

        res.status(201).json({user:newUser,token:token});
    }
catch(err){
    res.status(500).json({err});
}
}

const login = async (req, res) => {
    try {
        const {username,password} = req.body;

        const existingUser = await user.findOne({username});
        if(!existingUser){
            return res.status(400).json({message:"user does not exists"});
        }
        if(password !== existingUser.password){
            return res.status(400).json({message:"invalid credentials"});
        }

       const token = jwt.sign({username:username,id:existingUser._id},SECRET_KEY);


        res.status(200).json({username:username,token:token});
        
    } catch (error) {
        res.status(500).json({message:"something went wrong"});
    }}


    app.post('/api/signup',signup);
    app.post('/api/login',login); 


app.listen(3000, () => {
    console.log('Server is running at 3000');
});      
