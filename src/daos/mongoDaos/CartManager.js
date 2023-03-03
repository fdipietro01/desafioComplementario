const modeloCarrito = require("../../models/carritoModel");

class CartMaganer {
  constructor(path) {
    this.path = path;
  }
  addCart = async () => {
    try {
      const result = await modeloCarrito.create({});
      console.log({ result });
    } catch (err) {
      throw new Error("Error al crear el carrito", err);
    }
  };

  getProductsfromCart = async (cid) => {
    try {
      const carrito = await modeloCarrito.findOne({ _id: cid });
      return carrito ? carrito.productos : undefined;
    } catch (err) {
      throw new Error("Error al leer productos", err);
    }
  };

  updateProductFromCart = async (cid, pid) => {
    try {
      const cart = await modeloCarrito
        .findOne({ _id: cid })

      const parsedCart = JSON.stringify(cart, null, 2);
      // console.log(parsedCart)
      console.log(cart.productos.find(prod => prod._id === pid))
    
    //   const product = cart.productos.find((obj) => {
    //     console.log({laClave: obj._id});
    //     return obj.product._id === pid;
    //   });
    //   if (product) {
    //     product.quantity++;
    //   } else {
    //     cart.productos.push({ product: pid, quantity: 1 });
    //   }
      //await modeloCarrito.findByIdAndUpdate({ _id: cid }, cart);
    } catch (err) {
      console.log(err);
      throw new Error("Error al leer productos", err.message);
    }
  };
}

module.exports = CartMaganer;
