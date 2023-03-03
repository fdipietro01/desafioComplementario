const {Router} = require('express')
const routerProductos = require('./routerProductos')
const routerCarritos = require('./routerCarritos')

const router = Router()
router.use("/api/products", routerProductos)
router.use("/api/carts", routerCarritos)

router.get('/', (req, res)=>{
    res.send("Ruta Raíz")
})

module.exports = router