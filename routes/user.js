const e = require('express')
const express = require('express')
const db = require('../db')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../config')
const router = express.Router()
const utils = require('../utils')

router.get('/user/profile', (req, resp) => {

        const statement = `select id, firstName, lastName,email, phone from user where id = ${req.userID}`

        db.execute(statement, (error, data) => {
            // result 
            resp.send(utils.createResult(error,data))
        })
    
})


router.post('/user/signup', (req, resp) => {

    const { firstName, lastName, email, password } = req.body

    // encrupt the password
    const encryptedPassword = '' + crypto.SHA256(password)

    const statement = `insert into user (firstName,lastName, email, password) values ('${firstName}','${lastName}','${email}','${encryptedPassword}')`

    db.execute(statement, (error, data) => {

        const result = {
            status: ''
        }

        if (error) {
            // there is an error while performing the operation
            // console.log(`error : ${error}`);
            // console.log('error');
            result['status'] = 'error'
            result['error'] = error
        } else {
            // there is no error
            // console.log(data);
            // resp.send('okay')
            result['status'] = 'success'
            result['data'] = data
        }

        /* const result = utils.createResult(error,data)

        if (!error) {          
            result['status'] = 'success'
            result['data'] = data
        }else{
            resp.send(result)
        }
         */
        resp.send(result)
    })
})

router.post('/user/signin', (req, resp) => {

    const { email, password } = req.body

    const encryptedPassword = '' + crypto.SHA256(password)

    const statement = `select id, firstName, lastName,email, phone from user where email = '${email}' and password = '${encryptedPassword}'`

    db.execute(statement, (error, users) => {

        const result = {
            status: ''
        }

        if (error != null) {
            // error while executing statement
            result['status'] = 'error'
            result['error'] = error
        } else {

            if (users.length == 0) {
                // user does not exist
                result['status'] = 'error'
                result['error'] = 'User doest not exist'
            } else {
                const user = users[0]

                const payload = { id: user['id'] }
                const token = jwt.sign(payload, config.secret)

                result['status'] = 'success'
                result['data'] = {
                    token: token,
                    // id : user['id'],
                    firstName: user['firstName'],
                    lastName: user['lastName'],
                    email: user['email'],
                    phone: user['phone']
                }
            }
        }
        resp.send(result)
    })

})



module.exports = router