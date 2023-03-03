const {Router} = require('express')
const CartManager = require('../daos/mongoDaos/CartManager')

const routerCarritos = Router()
const carritoHandler = new CartManager()

routerCarritos.get('/:cid', async (req, res)=>{
    const { cid } = req.params
    try{
        const products = await carritoHandler.getProductsfromCart(cid)
        res.send(products)
    }
    catch(err){
        res.status(400).send(err)
    }
})

routerCarritos.post('/', async (req, res)=>{
    try{
       await carritoHandler.addCart()
        res.status(200).send({agregado: "success"})
    }
    catch(err){ 
        res.status(400).send(err.message)
    }
})

routerCarritos.post('/:cid/product/:pid', async(req, res)=>{
    const {cid, pid} = req.params
    try{
        await carritoHandler.updateProductFromCart(cid, pid)
        res.status(200).send({actualizado: "success"})
    }
    catch(err){ 
        res.status(400).send(err.message)
    }
})

module.exports = routerCarritos