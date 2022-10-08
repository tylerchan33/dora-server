const express = require('express')
const router = express.Router()
const db = require("../../models")

router.get("/trending", async (req, res) => {
    try {
        res.json("trending page")
    } catch(err) {
        console.warn(err)
    }
})

router.get("/song/:id", async (req, res) => {
    try {
        res.json("info on a song")
    } catch(err) {
        console.warn(err)
    }
}) 

router.get("/album/:id", async (req, res) => {
    try {
        res.json("info on album")
    } catch(err) {
        console.warn(err)
    }
}) 

module.exports = router