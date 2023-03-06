console.log("js");
// const server = io()

//LINK AL MANAGER DE PRODUCTOS


const goToManager = ()=>{
  window.location.href = "http://localhost:8080/realtimeproducts"
} 

//ELIMINAR PRODUCTO
const deleteForm = document.getElementById("deleteForm");
deleteForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const id = deleteForm.elements["eliminarId"].value;
  if (!id) {
    window.alert("Ingrese un id");
    return;
  }
  const data = await fetch(`http://localhost:8080/api/products/${id}`, {
    method: "DELETE",
  });
  const { redirectUrl, message } = await data.json();
  if (data.status === 200) {
    window.location.href = redirectUrl;
  } else {
    console.log(`${redirectUrl}/${message}`);
    window.location.href = `${redirectUrl}/${message}`;
  }
});

//AGREGAR PRODUCTO
const productForm = document.getElementById("form");
productForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const body = {};
  const inputsForms = Array.from(productForm.elements);
  let emptyValue;
  inputsForms.forEach(({ name: field, value }, index) => {
    if (index !== inputsForms.length - 1) {
        if(!value) emptyValue = true
        body[field] = value;
    }        
  });
  if(emptyValue){
    window.alert("Ingrese todos los campos")
    return
  }
  const data = await fetch("http://localhost:8080/api/products/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const { redirectUrl, message } = await data.json();
  if (data.status === 200) {
    window.location.href = redirectUrl;
  } else {
    window.location.href = `${redirectUrl}/${message}`;
  }
});

//ALERTA DE CATALOGO VACÍO
const handleAlert = (data) => {
  if (data.length === 0) {
    const newAlert = document.createElement("div");
    newAlert.innerHTML = `<div class="alert alert-danger mx-auto" style="width: 400px" role="alert">
        <span class="mx-auto"> No existen productos agregados por el momento.</span>
        </div>`;
    newAlert.id = "boxAlert";
    const container = document.getElementById("alertContainer");
    container.appendChild(newAlert);
  } else {
    const alert = document.getElementById("boxAlert");
    alert && alert.remove();
  }
};

//CREAR CARRITO
const newCartForm = document.getElementById("newCart");
newCartForm?.addEventListener("submit", async (evt) => {
evt.preventDefault()
const data = await fetch("http://localhost:8080/api/carts/", {method: "POST"})
const parsedData = await data.json()
alert(`Carrito creado. Número identificador: ${parsedData.id}`)
})

//BUSCAR CARRITO POR ID
const searchForm = document.getElementById("searchCart");
searchForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const id = searchForm.elements["cartId"].value;
  if (!id) {
    window.alert("Ingrese un id");
    return;
  }
  const data = await fetch(`http://localhost:8080/api/carts/${id}`);
  if (data.status === 200) {
    window.location.href = `http://localhost:8080/realtimeCarts/${id}`;
  } else {
    window.alert("Algo salio mal, reintentar por favor")
  }
});

//ACTUALIZAR CARRITO POR ID CARRITO & ID PRODUCTO
const cartId = document.getElementById("idNumber")?.innerText
const updateForm = document.getElementById("updateCart");
updateForm?.addEventListener("submit", async (evt) => {
  evt.preventDefault() 
const prodId = updateForm.elements["prodId"].value;
if (!prodId) {
  window.alert("Ingrese un id");
  return;
}
  const data = await fetch(`http://localhost:8080/api/carts/${cartId}/product/${prodId}`,{method: 'POST'})
  if (data.status === 200) {
    window.location.href = `http://localhost:8080/realtimeCarts/${cartId}`;
  } else {
    window.alert("Algo salio mal, reintentar por favor")
  }
})



// server.on("error", (err) => {
//     if (err === "Producto con código duplicado")
//         window.alert(err)
// })

// server.on("actualizarProductos", (data) => {
//     handleAlert(data)
//     const table = document.getElementById("tableProd")
//     const tableBody = document.getElementById("body")
//     tableBody.remove()
//     const newBody = document.createElement("tbody")

//     const newBodyContent = `<tbody>
//     ${data.map(prod => {
//         return `<tr>
//     <td>${prod.title}</td>
//     <td>${prod.description}</td>
//     <td>${prod.price}</td>
//     <td>${prod.code}</td>
//     <td>${prod.thumbnail}</td>
//     <td>${prod.stock}</td>
//     <td>${prod.category}</td>
//     <td>${prod.status}</td>
//     <td>${prod.id}</td>
//     </tr>`}).join(" ")}
//     </tbody>`
//     newBody.innerHTML = newBodyContent
//     table.appendChild(newBody)
//     table.lastElementChild.id = "body"
// })
