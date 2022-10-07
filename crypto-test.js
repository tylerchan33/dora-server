const bcrypt = require("bcryptjs")

const { createHash } = require("crypto")

// sha 256 hashes will be the same
// const hash = createHash("sha256")
// hash.update("hello")
// const digest = hash.digest("hex")
// console.log("sha256:", digest)

const testCrypto = async () => {
    try {
        // when a user is registering we need to make a hash of their password
        // test password hashing
        const password = "hello"
        // how many times we will reshash the password
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log(hashedPassword)
        // when a user is logging in we need to test the password that they supply against a hash that we have stored in the database
        // test comparing hashes
        // bcrypt.compare("string to match", "hash to match")
        const matchPasswords = await bcrypt.compare("hello", hashedPassword)
        console.log(matchPasswords)
    } catch(err) {
        console.log(err)
    }
}

testCrypto()