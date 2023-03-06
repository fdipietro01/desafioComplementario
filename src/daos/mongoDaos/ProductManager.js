const modeloProducto = require('../../models/productoModel')
const {Types} = require('mongoose')

class ProductManager {
   
    addProduct = async (producto) => {

        try {
            await modeloProducto.create(producto)
            return producto
        }
        catch (err) {
            console.log(err)
            throw new Error("Error al grabar el producto", err)
        }
    }

    getProducts = async () => {
        {
            try {
                const dataProds = await modeloProducto.find().lean()
                return dataProds
            }
            catch (err) {
                throw new Error("Error al leer productos", err)
            }
        }

    }

    getProductById = async (id) => {
        const dataProd = await modeloProducto.findById(id)
        if (dataProd) return { find, idx }
        else throw new Error("Producto no encontrado")
    }

    updateProduct = async (id, newProd) => {
        try {
            await modeloProducto.updateOne({_id: id}, newProd)
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    deleteProduct = async (id) => {
        try {
            const parsedId = Types.ObjectId(id)
            const {deletedCount} = await modeloProducto.deleteOne({_id: parsedId})
            return deletedCount
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = ProductManager