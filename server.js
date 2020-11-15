const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {

    const publicFoulder = './public'

    let body = null
    try {
        body = fs.readFileSync(`${publicFoulder}${req.url}`)
    } catch (e) {
        console.log(e)
        body = fs.readFileSync(`${publicFoulder}/index.html`)
    }
    res.end(body)
})

const port = process.env.PORT || 3000
server.listen(port)

console.log(`Server started on port ${port}!`)

