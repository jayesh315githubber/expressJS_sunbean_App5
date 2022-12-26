
const jwt = require('jsonwebtoken')
const secret = '122345'

function client() {
    const data = { id : 1}

    const token = jwt.sign(data, secret )
    console.log(token);
}

client()

function server(params) {
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjcxOTkyMjY1fQ.GWdzkicAnkfdXCZDk-fLVrDHzeBXdR9k2n8UbUvM5uY'
    const data = jwt.verify(token,secret)
    console.log(data);
}

server();