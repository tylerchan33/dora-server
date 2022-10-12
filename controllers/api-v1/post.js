const express = require('express')
const router = express.Router()
const { Post } = require("../../models/Post")
const db = require("../../models")
const { isValidObjectId } = require('mongoose')
const authLockedRoute = require('./authLockedRoute')

// renders home page
router.get("/", authLockedRoute, async (req, res) => {
    try {
        const posts = await db.Post.find({})
        console.log(posts)
        res.json(posts)
    } catch (err) {
        console.warn(err)
    }
})

router.get("/new", authLockedRoute, async (req, res) => {
    try {
        console.log("hey")
        res.json({msg:"new post form"})
    } catch (err) {
        console.warn(err)
    }
})

router.get("/:id", authLockedRoute, async (req, res) => {
    try {
        const post = await db.Post.findById(req.params.id)
        res.json(post)
    } catch(err) {
        console.warn(err)
    }
})

router.get("/:id/edit", authLockedRoute, async (req, res) => {
    try {
        res.json({msg:`edit page for a post:${req.params.id}`})
    } catch(err) {
        console.warn(err)
    }
})

router.post("/new", authLockedRoute, async (req, res) => {
    try {
        const newPost = await db.Post.create(req.body)
        res.json(newPost)
    } catch(err) {
        console.warn(err)
    }
})

router.put("/:id", authLockedRoute, async (req, res) => {
    try {
        const options = { new: true }
        const updatePost = await db.Post.findByIdAndUpdate(req.params.id, req.body, options)
        res.json(updatePost)
    } catch(err) {
        console.warn(err)
    }
})

router.delete("/:id", authLockedRoute, async (req, res) => {
    try {
        await db.Post.findByIdAndDelete(req.params.id)
        res.sendStatus(204)
    } catch(err) {
        console.warn(err)
    }
})
module.exports = router