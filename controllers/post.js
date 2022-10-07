const express = require('express')
const router = express.Router()
const db = require("../models")

// renders home page
router.get("/", async (req, res) => {
    try {
        console.log("hello")
        res.json("post")
    } catch (err) {
        console.warn(err)
    }
})

router.get("/new", async (req, res) => {
    try {
        res.json("new post form")
    } catch (err) {
        console.warn(err)
    }
})

router.get("/:id", async (req, res) => {
    try {
        res.json("post by id")
    } catch(err) {
        console.warn(err)
    }
})

router.get("/:id/edit", async (req, res) => {
    try {
        res.json("edit page for a post")
    } catch(err) {
        console.warn(err)
    }
})

router.post("/new", async (req, res) => {
    try {
        res.json("posting new post")
    } catch(err) {
        console.warn(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        res.json("updates post")
    } catch(err) {
        console.warn(err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        res.json("deletes post")
    } catch(err) {
        console.warn(err)
    }
})
module.exports = router