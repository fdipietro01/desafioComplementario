console.log("chat");
const socket = io();

let usr;
const chatbox = document.getElementById("chatbox");
//ALERTA INICIAL PARA IDENTIFICACION
Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresar un usuario para identificarte",
  inputValidator: (value) =>
    !value && "Ingresa un nombre de usuario para continuar",
  allowOutsideClick: false,
}).then((res) => {
  usr = res.value;
  socket.emit("usrLogueado", usr);
});

//EVENTO PARA DISPARAR TOAST AL RESTO DE LOS USUARIOS
socket.on("nuevoUsuarioAlerta", (data) => {
  const title = `Nuevo usuario conectado: ${data}`;
  Swal.fire({
    title,
    toast: true,
    showConfirmButton: false,
    position: "top-right",
    timmer: 3000,
    icon: "success",
  });
});

//EVENTO PARA RECIBIR HISTORIAL DEL CHAT AL CONECTARSE
socket.on("chat", ({ chat, name }) => {
  if (name) {
    const welcome = document.getElementById("welcome");
    welcome.innerText = `Bienvenido ${name}`;
  }
  let log = document.getElementById("messageLog");
  let html = "";
  chat.forEach(({ user, message }) => {
    html =
      html +
      `<li class="mt-2"><span style="color:green; font-weight: bold; ">${user}: </span>
        <span>${message}</span></li>`;
  });
  log.innerHTML = html;
  log.scrollIntoView(false)
});

const handleSocket = (e) => {
  if (e.key === "Enter") {
  }
};
chatbox.addEventListener("submit", (e) => {
  e.preventDefault();
  const parsedMessage = chatbox.elements["newText"].value?.trim();
  if (parsedMessage.length > 0)
    socket.emit("nuevoMsj", {
      user: usr,
      message: parsedMessage,
    });
  chatbox.reset();
});
