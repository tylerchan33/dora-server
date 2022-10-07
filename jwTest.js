const jwt = require("jsonwebtoken")

const jwTest = () => {
    try {
        // create a jwt payload -- the data that is encoded
        const payload = {
            // public user information
            // DO NOT PUT PASSWORD IN THE PAYLOAD
            name: "Weston",
            id: "1234",
            email: "w@b.com"
        }

        // sign jwt by supplying a secret to hash in the signature
        const secret = "my super big secret"
        // jwt.sign({payload to encode}, "secret to create signature", { options eg. , { expiresIn: "1h" }})
        const token = jwt.sign(payload, secret)
        console.log(token)
        // head (specifies encoding standard for the jwt): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
        // payload (encoded data): eyJuYW1lIjoiV2VzdG9uIiwiaWQiOiIxMjM0IiwiZW1haWwiOiJ3QGIuY29tIiwiaWF0IjoxNjY1MDgyMjQxfQ.
        // signature (hash of the payload and secret): f2uTY4HL1xwO5W9HmKFvGZ9ve7Ggb4MYzFaycIqj5Fs

        // signing a taken will log a user in
        // jwt.verify(token, secret) -- throws an error if it cannot verify
        const decode = jwt.verify(token, secret)
        console.log(decode)

        // when we decode jwts we will check the signature to make sure the user's login is valid, this authorizes the user
    } catch(err) {
        console.log(err)
    }
}

jwTest()