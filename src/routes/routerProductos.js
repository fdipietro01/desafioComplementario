const {Router} = require('express')
const ProductManager = require('../daos/mongoDaos/ProductManager')

const routerProductos = Router()
const productHandler = new ProductManager()

routerProductos.get('/', async (req, res)=>{
    try{
        const products = await productHandler.getProducts()
        res.send(products)
    }
    catch(err){
        res.status(400).send(err)
    }
})

routerProductos.post('/', async (req, res)=>{
    const producto = req.body
    if(req.body.status === undefined) req.body.status = true
    try{
       await productHandler.addProduct(producto)
        res.status(200).send({agregado: "success"})
    }
    catch(err){ 
        res.status(400).send(err.message)
    }
})


routerProductos.put("/:pid", async (req, res)=>{
    const { pid } = req.params
    const newProd = req.body
    if(req.body.status === undefined) req.body.status = true
    if(Object.keys(newProd).length === 0) return res.status(400).send("Enviar producto a actualizar")
    try{
        console.log(newProd)
        await productHandler.updateProduct(pid, newProd)
        res.status(200).json({actualizado: "success"})
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

routerProductos.delete("/:pid", async(req, res)=>{
    const {pid} = req.params
    try{
        productHandler.deleteProduct(pid)
        res.status(200).json({eliminado: "success"})
    }
    catch(err){
        res.status(400).send(err.message)
    }
}
)

module.exports = routerProductos