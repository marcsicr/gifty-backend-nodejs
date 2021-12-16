const favsRouter = require('express').Router()
const {loginFilter} = require('../middleware/userExtractor')
const {okResponse} = require('../APIResponse')
const User = require('../models/user')

favsRouter.get('/', loginFilter,async (request,response) => {

    const {userId} = request
    if(!userId) return response.status(500)

    const user = await User.findById(userId)
    
    console.log('Likes :' + user.likes)
    response.json(okResponse({gifs:user.likes}))

})


favsRouter.post('/:idGif',loginFilter, async(request,response) => {
    const {userId} = request

    console.log('Adding favorite')
    
    if(!userId) return response.status(500)

    await User.findOneAndUpdate({_id:userId},{
        $addToSet:{likes: request.params.idGif}
    })

    response.status(201).send()
})

favsRouter.delete('/:idGif',loginFilter, async(request,response) => {
    const {userId} = request

    console.log('Removing favorite')
    
    if(!userId) return response.status(500)

    await User.findOneAndUpdate({_id:userId},{
        $pull:{likes: request.params.idGif}
    })

    response.status(204).send()
})


module.exports = favsRouter