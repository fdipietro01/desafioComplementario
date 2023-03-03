const { Router } = require('express')

const routerUsuarios = Router()

routerUsuarios.get('/', (req, res) => {
    res.send([])
})

module.exports = routerUsuarios