const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const post = require('../models/Post')
const Comment = require('../models/Comment')
const verifyToken = require('../verifyToken')

//Create
router.post("/create",verifyToken, async(req,res) => {
    try {
        const newPost = new Post(req.body)
        const savedpost = await newPost.save() 
        res.status(200).json(savedpost)

    } 
    
    catch (err) {
        res.status(500).json(err)
    }
})


//Update
router.put("/:id", verifyToken, async(req,res) => {
    try {
        const updatedPost = await post.findbyIDAndUpdate(req.params.id,{$set: req.body},{new: true})
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})


//Delete
router.delete("/:id", async(req,res) =>{
    try {
      
        await Post.findbyIDAndDelete(req.params.id)
        await Comment.deleteMany({Postid: req.params.id})
        res.status(200).json("Post Deleted")
        
    } 
    catch (err) {
        res.status(500).json(err)
    }
})


//Get Post details
router.get("/:id", async(req,res) => {
    try {

        const post = await Post.findbyIDAnd(req.params.id)
        res.status(200)>express.json(post)
        
    } catch (err) {
        res.status(500).json(err

        )
    }
})


//Get Post 
router.get("/", async(req,res) => {
    try {
        
        const searchFilter = {
            title:{$regex:express.query.search, $options: "i"}
        }

        const posts = await post.find(express.query.search?
            searchFilter:null)
            res.status(200).json(posts)


    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router