const modeloProducto = require('../../models/productoModel')

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
                const dataProds = await modeloProducto.find()
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
            console.log(id)
            await modeloProducto.updateOne({_id: id}, newProd)
        }
        catch (err) {
            throw new Error(err.message)
        }
    }

    deleteProduct = async (id) => {
        try {
            await modeloProducto.deleteOne({_id: id })
        }
        catch (err) {
            throw new Error(err.message)
        }
    }
}

module.exports = ProductManager