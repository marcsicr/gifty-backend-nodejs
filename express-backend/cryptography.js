const bcrypt = require('bcrypt')

const cryptograpy = {

    cryptPwd: async(password) => {
        const saltRounds = 10
        return bcrypt.hash(password,saltRounds)
    },

    checkPwd: async (password,hash) => {
        return bcrypt.compare(password,hash)
    }
}

module.exports = cryptograpy