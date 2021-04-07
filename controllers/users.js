const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')


userRouter.get('/',(request,response) =>{
    User.find({}).then(users => {
        response.json(users)
    })
})

userRouter.post('/register', async(request,response) =>{
    const {body} = request
    const {username,password} = body

    let existsUser =  await User.findOne({username:username}).exec() == null?false:true

    if(existsUser){
        response.json({success:false})
        return
    } 
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password,saltRounds)

    const newUser = new User({
        username,
        pwd:passwordHash,
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
        : await bcrypt.compare(pwd,user.pwd)

    if( !(user && passwordCorrect)){
        response.status(401).json({
            success:false,
            errorMsg:'Invalid user or password'
        }).send()
    }

    const userForToken = {
        id:user.id,
        username:user.username
    }

    const token = jwt.sign(userForToken, process.env.TOKEN_SIGN_KEY)

    response.json({
        data:{
            username:user.username,
            jwt:token,
            success:true
        }
    })
})


module.exports = userRouter