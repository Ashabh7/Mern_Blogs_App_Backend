const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')


//Register
router.post("/register", async (req,res) => {
    try{
        const {username,email,password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hashSync(password,salt)
        const newUser = new User ({
            username,email,password:hashedpassword
        })
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)

    }
    
    catch(err){
        res.status(500).json(err)
    }
})



//Login
router.post("/login", async (req,res) => {
    try{
        const user = await User.findO({email:req.bady.email}) 
        if(!user){
            return res.status(404).json("User Not Found!")
        }
        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match){
            return res.status(500).json("Wrong Password")
        }

       const token = jwt.sign({_id, username:user.username,
         email:user.email}, process.env.SECRET,{expiresIn: "3d"}) 
         const {password, ...info} = user._doc
         res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
         }).status(200).json(info)

    }


    catch(err){
        res.status(500).json(err)
    }
})

//logout
router.get("/logout", async (req,res) => {
    try{
        res.clearCookie("token", {sameSite: 'none', secure: true}).status(200).send("User Logged Out Successfully")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//Refetch
router.get("/refetch", (req,res) => {
    const token = req.cookies.token
    jwt.verify(token,process.env.SECRET, {}, async(err,data) =>{
        if(err){
            res.status(404).json(err)
        }
        res.status(200).json(data)
    })
})
