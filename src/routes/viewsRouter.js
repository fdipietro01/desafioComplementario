const { Router } = require("express");
const {Types} = require("mongoose")
const ProductManager = require("../daos/mongoDaos/ProductManager");
const CartManager = require("../daos/mongoDaos/CartManager");

const viewsRouter = Router();
const productHandler = new ProductManager();
const cartHandler = new CartManager()

viewsRouter.get("/", async (req, res) => {
  try {
    const data = await productHandler.getProducts();
    const dataExist = data.length === 0 ? false : true;
    res.render("homeProductos", { data, dataExist, message: false });
  } catch (err) {
    res.send({ error: err.message });
  }
});

viewsRouter.get("/realtimeproducts", async (req, res) => {
  try {
    const data = await productHandler.getProducts();
    const dataExist = data.length === 0 ? false : true;
    res.render("editProductos", { data, dataExist });
  } catch (err) {
    res.send({ error: err.message });
  }
});

viewsRouter.get("/newCart", async (req, res) => {
  res.render("homeCarritos");
});

viewsRouter.get("/realtimeCarts/:id", async (req, res) => {
  const {id} = req.params
  try{
    const catalogProducts = await productHandler.getProducts();
    const catalogExists = catalogProducts.length === 0 ? false : true;
    const cartProducts = await cartHandler.getProductsfromCart(Types.ObjectId(id));
    const cartExist = cartProducts.length === 0 ? false : true;
    res.render("editCarritos", {id, catalogProducts, catalogExists, cartProducts, cartExist});
  }
  catch(err){
    res.render('alert', {message: err.message})
  }
});

module.exports = viewsRouter;
