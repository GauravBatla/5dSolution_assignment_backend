const route = require('express').Router()
const userValidation = require('../validations/userValidation')
const momentValidation = require('../validations/momentValidation')
const userController = require('../controllers/userController')
const momentController = require('../controllers/momentController')
const jwt = require('../middleware/jwt.middleware');

route.get('/test', (req, res) => {
    return res.send("ok")
})

// for user new sign up route 
route.post('/signup', userValidation.SignUpUser, userController.signup)

// for user login route
route.post('/login', userValidation.login, userController.login);

//for user add moment route
route.post('/moment/add', jwt, momentValidation.AddMoment, momentController.AddMoment)

// momemnt list for particular user 
route.get('/moment/get', jwt, momentController.getMoment)

//momemt update 

route.put('/moment/update/:id',jwt,momentValidation.updateMoment,momentController.updateMoment)

module.exports = route