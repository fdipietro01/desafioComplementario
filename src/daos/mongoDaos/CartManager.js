const modeloCarrito = require("../../models/carritoModel");

class CartMaganer {
  constructor(path) {
    this.path = path;
  }
  addCart = async () => {
    try {
      return await modeloCarrito.create({});
    } catch (err) {
      throw new Error("Error al crear el carrito", err);
    }
  };

  getProductsfromCart = async (cid) => {
    try {
      const carrito = await modeloCarrito.findOne({ _id: cid }).lean();
      if (!carrito) throw new Error("No existe el carrito con ese Id");
      //mapping response
      let products;
      if (carrito.productos.length === 0) products = [];
      else {
        products = carrito.productos.map(({ product, quantity }) => {
          const newProd = {...product, _id: product._id.toString(), quantity}
          return newProd;
        });
      }
      return products;
    } catch (err) {
      console.log(err.message)
      throw new Error("Error al leer productos", err);
    }
  };

  updateProductFromCart = async (cid, pid) => {
    try {
      const cart = await modeloCarrito.findOne({ _id: cid });

      const index = cart.productos.findIndex(
        (obj) => obj.product._id.toString() === pid
      );
      if (index !== -1) {
        cart.productos[index].quantity++;
      } else {
        cart.productos.push({ product: pid, quantity: 1 });
      }
      await modeloCarrito.findByIdAndUpdate({ _id: cid }, cart);
    } catch (err) {
      console.log(err);
      throw new Error("Error al leer productos", err.message);
    }
  };
}

module.exports = CartMaganer;
