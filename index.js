const express = require('express')
const app = express()
const port = process.env.POT || 9999

app.get('/', (req, res) => {
    res.send('Hello Explore The Nature Server!!!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})