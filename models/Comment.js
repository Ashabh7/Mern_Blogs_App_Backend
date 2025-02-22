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
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save() 
        res.status(200).json(savedComment)

    } 
    
    catch (err) {
        res.status(500).json(err)
    }
})


//Update
router.put("/:id", verifyToken, async(req,res) => {
    try {
        const updatedComment = await Comment.findbyIDAndUpdate(req.params.id,{$set: req.body},{new: true})
        res.status(200).json(updatedComment)
    } catch (err) {
        res.status(500).json(err)
    }
})


//Delete
router.delete("/:id", async(req,res) =>{
    try {
      
        await Comment.findbyIDAndDelete(req.params.id)
        res.status(200).json("Comment Deleted")
        
    } 
    catch (err) {
        res.status(500).json(err)
    }
})


//Get Comments
router.get("/post/:postId", async(req,res) => {
    try {
        const comments = await Comment.find({Postid:req.params.postId})
        res.status(200).json(comments)
        
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router