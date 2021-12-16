const okResponse = (payload) =>{
    return {success:true, data:payload}
}

const errorResponse = ({errorMsg}) =>{
    return {success:false, error:errorMsg}
}

module.exports = {okResponse, errorResponse}