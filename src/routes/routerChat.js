const { Router } = require('express')

const routerChat = Router()
routerChat.get('/', (req, res) => {
    res.render("chat")
})

module.exports = routerChat
