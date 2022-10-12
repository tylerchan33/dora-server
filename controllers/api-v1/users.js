const router = require('express').Router()
const db = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')


// GET /users - test endpoint
router.get('/', (req, res) => {
  res.json({ msg: 'welcome to the users endpoint' })
})

// POST /users/register - CREATE new user
router.post('/register', async (req, res) => {
  try {
    // check if user exists already
    const findUser = await db.User.findOne({
      email: req.body.email
    })

    // don't allow emails to register twice
    if(findUser) return res.status(400).json({ msg: 'email exists already' })
  
    // hash password
    const password = req.body.password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
  
    // create new user
    const newUser = new db.User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })
  
    await newUser.save()

    // create jwt payload
    const payload = {
      name: newUser.name,
      username: newUser.username,
      email: newUser.email, 
      id: newUser.id
    }

    // sign jwt and send back
    const token = await jwt.sign(payload, process.env.JWT_SECRET)

    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'server error'  })
  }
})

// POST /users/login -- validate login credentials
router.post('/login', async (req, res) => {
  try {
    // try to find user in the db
    const foundUser = await db.User.findOne({
      email: req.body.email
    })

    const noLoginMessage = 'Incorrect username or password'

    // if the user is not found in the db, return and sent a status of 400 with a message
    if(!foundUser) return res.status(400).json({ msg: noLoginMessage })
    
    // check the password from the req body against the password in the database
    const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password)
    
    // if provided password does not match, return an send a status of 400 with a message
    if(!matchPasswords) return res.status(400).json({ msg: noLoginMessage })

    // create jwt payload
    // DON'T PUT PASSWORD
    const payload = {
      name: foundUser.name,
      username: foundUser.username,
      email: foundUser.email, 
      id: foundUser.id
    }

    // sign jwt and send back
    const token = await jwt.sign(payload, process.env.JWT_SECRET)

    res.json({ token })
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: 'server error'  })
  }
})


// GET /auth-locked - will redirect if bad jwt token is found
router.get('/auth-locked', authLockedRoute, (req, res) => {
  // you will have access to the user on the res.locals.user
  console.log(res.locals)
  res.json( { msg: 'welcome to the private route!' })
})

router.get('/:userId', authLockedRoute, async (req, res) => {
  try {
    const findUser = await db.User.findById(req.params.userId)
    res.json(findUser)
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: 'server error'  })
  }
})

router.put('/profile/:userId/edit', authLockedRoute, async (req, res) => {
  try{

    const foundUser = await db.User.findOne({
      id: req.params.id
    })

    if(!foundUser) return res.status(400).json({message: "cannot find user"})

    const options = { new: true }
    const password = req.body.password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const body = {
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }
    const updateUser = await db.User.findByIdAndUpdate(req.params.userId, body, options)
   
    const payload = {
      name: updateUser.name,
      username: updateUser.username,
      email: updateUser.email,
      id: updateUser.id
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET)
    res.json({ token })
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: 'server error'  })
  }
})



module.exports = router