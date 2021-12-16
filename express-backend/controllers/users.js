const jwt = require('jsonwebtoken')
const Crypto = require('../cryptography')

const userRouter = require('express').Router()
const {okResponse,errorResponse} = require ('../APIResponse')
const User = require('../models/user')

const settingsRouter = require('./user-settings')
userRouter.use('/settings',settingsRouter)

userRouter.post('/register', async(request,response) =>{
    const {body} = request
    const {username,password} = body

    let existsUser =  await User.findOne({username:username}).exec() == null?false:true

    if(existsUser){
        response.json(errorResponse({errorMsg:'User already exists'}))
    } 
    
   
    const passwordHash = await Crypto.cryptPwd(password)

    const newUser = new User({
        username,
        pwd:passwordHash,
        settings:{
            email:'',
            displayName:username,
            about:'',
            rating:'g',
            avatar:''
        },
        likes:[]
    })
    
    await newUser.save()
    response.json({success:true})
})

userRouter.head('/exists/:username', async (request, response) =>{

    const user = request.params.username
    
    let existsUser =  await User.findOne({username:user}).exec() == null?false:true
    // response.setHeader('Exists-User',existsUser)

    if(existsUser)
        response.status(200).send()
    else
        response.status(404).send()

})

userRouter.post('/login', async (request, response) =>{

    const {body} = request
    const {username,pwd} = body

    const user = await User.findOne({username})


    const passwordCorrect = user == null?
        false 
        : await Crypto.checkPwd(pwd,user.pwd)

    if( !(passwordCorrect)){
        response.status(401).json(errorResponse({errorMsg:'Invalid user or password'})).send()
        return
    }

    const userForToken = {
        id:user.id,
        username:user.username
    }

    const token = jwt.sign(userForToken, process.env.TOKEN_SIGN_KEY)
    const respObj = okResponse({
        user:{
            username:username,
            settings:user.settings
        },
        jwt:token})

    response.json(respObj)
})

module.exports = userRouter