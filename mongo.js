require('dotenv').config()
const mongoose = require('mongoose')

const mongoUsername = process.env.DB_USER
const mongoPwd = process.env.DB_PASS
const host = process.env.DB_HOST
const port = process.env.DB_PORT || 27017


const connectionString = `mongodb://${mongoUsername}:${mongoPwd}@${host}:${port}/gifty?authSource=admin&retryWrites=true`


mongoose.connect(connectionString,{
    useNewUrlParser:true, 
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex:true
}).then(() => {
    console.log('Connected to MongoDB')
}).catch(err => {
    console.error(err)
})

