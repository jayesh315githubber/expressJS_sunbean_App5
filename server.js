
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config')

// list of routers
const routerUser = require('./routes/user')
const routerCategory = require('./routes/catagory')


const app = express()
app.use(bodyParser.json())

// creating meddleware function 
app.use((req, resp, next) => {

    //skip checking the token for following API
    // signIN and SignUP

    if ((req.url == '/user/signin') || (req.url == '/user/signup')) {

        // skip chuecking the token
        next()
    } else {

        // get the token sent by client from headers
        const token = req.headers['token']

        try {
            // verify  if the token is valid or original or intact
            const payload = jwt.verify(token, config.secret)

            // if the token is valid, grab the user id
            // add the user id in the request Object so that it can be used
            // in every other API's
            req.userID = payload['id']

            // call the next handler
            next()

        } catch (ex) {
            resp.send({
                status: 'error',
                error: 'unauthorized access'
            })
        }
    }
})

//add routers
app.use(routerUser)
app.use(routerCategory)

app.get('/', (req, resp) => {
    resp.send('welecome to ecommerce application.')
})

app.listen(3004, '0.0.0.0', () => {
    console.log('server started on port 3004');
})