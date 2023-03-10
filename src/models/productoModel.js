const {Schema, model} = require('mongoose')

const collection = 'productos'
const ProductoSchema = new Schema({ 
    title: {
        type: String, 
        required: true,
    },
    description: {
        type: String, 
        required: true,
    },
    code: {
        type: String, 
        required: true,
        unique: true, 
    },
    price: {
        type: Number, 
        required: true,
    },
    stock: {
        type: Number, 
        required: true,
    },
    category: {
        type: String, 
        required: true,
    },
    thumbnail: {
        type: String, 
        required: true,
    },
    status: {
        type: String, 
 //       required: true,
    }
})

module.exports =  model(collection, ProductoSchema)


 
