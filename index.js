

const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')
app.use(cors())

require('./mongo')


const userRouter = require('./controllers/users')
app.use('/user',userRouter)

const favsRouter = require('./controllers/favorites')
app.use('/user/favorites',favsRouter)


app.get('/',(request,response) =>{
    response.send('<h1>Hello world</h1>')
})

// app.get('/likes/:username',(request,response) => {
    
//     const params = request.params
//     const username = params.username
//     console.log('Username on params' + username)

//     const data = likes.filter(like => like.username === username)

//     if(data.length >0){
//         response.json(data)
//     }else{
//         response.status(404).end()
//     }
   
// })



// app.get('/likes', (request,response) => {
 
//     response.status(200).json(likes)
// })
 

// app.post('/likes', (request,response) => {

//     console.log('Posting new like')
//     const like = request.body

//     if(!like || !like.username || !like.gif){
//         return response.status(400).json({
//             error:'like values is missing'
//         })
//     }

//     const newLike = {
//         username: like.username,
//         gif: like.gif
//     }

//     likes = [...likes, newLike]

//     response.status(201).json(newLike)
// })

const PORT = 3005
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
