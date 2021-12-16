
const settingsRouter = require('express').Router()
const User = require('../models/user')
const {loginFilter} = require('../middleware/userExtractor')
const {okResponse,errorResponse} = require ('../APIResponse')
const sharp = require('sharp')
const path = require('path')
const Crypto = require('../cryptography')
const imageUploader = require('../middleware/imageUploader')
const SEARCH_RATTINGS = require('../rattings')
const fs = require('fs')


settingsRouter.get('',loginFilter,async (request, response) =>{

    const {userId} = request
    console.log('User is',userId)
    const dbUser = await User.findById(userId).exec()
    const existsUser = dbUser != null

    if(!existsUser)
        response.status(404).send()

    const{settings} = dbUser
    let responseObj = okResponse({settings:settings})
    response.json(responseObj)
})

settingsRouter.put('/rating',loginFilter,async (request, response) =>{

    const {userId} = request
    const{rating} = request.body
    if(!SEARCH_RATTINGS.includes(rating))
        response.status(400).json(errorResponse({errorMsg:'Ratting option missing or invalid'}))

    const dbUser = await User.findById(userId)
    
    if(dbUser == null)
        response.status(400).json(errorResponse({errorMsg:'Invalid user'}))

    dbUser.settings.rating = rating
    await dbUser.save()
    console.log(dbUser)

    response.status(200).json(okResponse({user: {
        username:dbUser.username,
        settings:dbUser.settings
    }}))
    
})

settingsRouter.put('/account',loginFilter,async (request, response) =>{

    const {userId} = request
    const{email,displayName,about} = request.body
    
    const dbUser = await User.findById(userId)

    dbUser.settings.email = email
    dbUser.settings.displayName = displayName
    dbUser.settings.about = about

    await dbUser.save()
    
    if(dbUser == null)
        response.status(400).json(errorResponse({errorMsg:'Invalid user'}))
    

    response.json
    console.log(dbUser)
    response.status(200).json(okResponse({user: {
        username:dbUser.username,
        settings:dbUser.settings
    }}))
    
})


settingsRouter.put('/avatar',loginFilter,imageUploader.single('avatar'), async (request,response) =>{
    
    const file = request.file
    if(!file)
        response.status(400).json(errorResponse({errorMsg:'Missing file'})).send()

    const {userId} = request
    const dbUser = await User.findById(userId)
    if(dbUser == null)
        response.status(400).json(errorResponse({errorMsg:'Invalid user'}))
    
    const filePath = path.resolve(`${__dirname}/../avatars/${userId}`)
    await sharp(request.file.buffer).resize(250, 250).toFile(filePath)

    dbUser.settings.avatar = userId
    await dbUser.save()

    response.status(200).json(okResponse())
    
})

settingsRouter.get('/avatar',loginFilter,async(request,response) => {

    const{userId} = request
    const dbUser = await User.findById(userId)
    const filePath = path.resolve(`${__dirname}/../avatars/${dbUser.settings.avatar}`)
    if(fs.existsSync(filePath)){
        response.sendFile(filePath)
    }else{
        response.status(404).send()
    }
    

})

settingsRouter.post('/password',loginFilter,async(request,response) => {

    const{userId,body} = request
    const {currentPwd,newPwd} = body
    console.log(currentPwd,newPwd)

    if(!currentPwd || !newPwd)
        response.status(400).json(errorResponse({errorMsg:'Expected current and new passwords'})).send()

    const dbUser = await User.findById(userId)
    const passwordCorrect = dbUser == null?
        false 
        : await Crypto.checkPwd(currentPwd,dbUser.pwd)

    if(!passwordCorrect){
        response.status(401).json(errorResponse({errorMsg:'Wrong user credentials'}))
    }

    dbUser.pwd = await Crypto.cryptPwd(newPwd)

    dbUser.save()

    response.status(200).json(okResponse())
})

module.exports = settingsRouter

