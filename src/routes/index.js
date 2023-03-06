const {Router} = require('express')
const routerProductos = require('./routerProductos')
const routerCarritos = require('./routerCarritos')
const routerViews = require('./viewsRouter')
const routerChat = require('./routerChat')

const router = Router()
router.use("/api/products", routerProductos)
router.use("/api/carts", routerCarritos)
router.use("/chat", routerChat)
router.use("/", routerViews)
router.use("/alerts/:message", (req, res)=>{
    const {message} = req.params
    res.render('alert', {message})
})

module.exports = router