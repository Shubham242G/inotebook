const express = require('express');
const { body,validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser');


const JWT_SECRET = process.env.REACT_APP_JWT_SECRET ;

//ROUTE-1: Create a user using: POST "/api/auth/createuser".No login required
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid E-mail').isEmail(),
    body('password').isLength({min: 5}),
],async(req,res)=>{
    let success = false;
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors: errors.array()});
    }
    //Check wether the user with this emil exists already 
    try{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success,error: "Sorry a user with this email already exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);
    //create a user
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
    })
    const data={
      user:{
        id: user.id, 
      }  
    }
    
    // .then(user => res.json(user))
    // .catch(err=>console.log(err));
    // res.json({error: 'Please enter a unique value for email'})
    
    const authToken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success,authToken: authToken})
    
    }catch(error){
        console.error(error.message)
        res.status(500).send("Some error occured");
    }
})

//ROUTE-2:Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Password cannot be blank').exists(),
],async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({ success, error:"Please try to login with correct credentials"});
        }

        const data={
            user:{
              id: user.id, 
            } 
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    }catch(error) {
            console.error(error.message)
            res.status(500).send("Internal server error occured");
    }

})
//ROUTE-3:Get loggedin User Details using: POST"/api/auth/getuser".Login required
router.post('/getuser',fetchUser,async(req,res)=>{
    
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("password") 
        res.send(user);
    } catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error occured");   
    }
})
module.exports = router