const jwt = require('jsonwebtoken')
const {errorResponse} = require('../APIResponse')

const loginFilter = (request,response,next) =>{
    
    const authHeader = request.get('authorization')
    let token = ''
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1]
    }

    if(!token) {
        return response.status(401).json(
            errorResponse({errorMsg:'Missing token'})
        )
    }

    let decodedToken = ''
    try{
        decodedToken = jwt.verify(token,process.env.TOKEN_SIGN_KEY)
    }catch(error){
        console.error(error)
        return response.status(401).json(
            errorResponse({errorMsg:'Invalid token'})
        )
    }

    request.userId = decodedToken.id
    next()
}

module.exports = {loginFilter}

    
