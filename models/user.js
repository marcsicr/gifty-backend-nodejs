const {Schema,model} = require('mongoose')
const _ = require('underscore')

const userSchema = new Schema({
    username:{type:String,unique:true},
    pwd:String,
    likes:[{type:String}]
})

userSchema.set('toJSON', {
    transform:(document,returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

        delete returnedObject.pwd
    }
})

const User = model('User',userSchema)

module.exports = User
