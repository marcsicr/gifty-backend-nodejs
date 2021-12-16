const express = require('express')
const app = express()
app.use(express.json())
const cors = require('cors')

app.use(cors())
require('./mongo')

const fs = require('fs')
const path = require('path')
const avatarFolder = path.join(__dirname,'avatars')
console.log('Avatar location: ',avatarFolder)
if(!fs.existsSync(avatarFolder)) {
 
    fs.mkdir(avatarFolder,{recursive:true},(err,path) =>{
        if(err){
            console.log('Failed on createing avatars folder. Reason:',err)
            exit(-1)
        }else{
            console.log('Created avatars folder on', path)
        }
    })
}
    
const userRouter = require('./controllers/users')
app.use('/user',userRouter)

const favsRouter = require('./controllers/favorites')
const { exit } = require('process')
app.use('/user/favorites',favsRouter)

app.get('/',(request,response) =>{
    response.send('<h1>Hello world</h1>')
})

const PORT = 3005
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
