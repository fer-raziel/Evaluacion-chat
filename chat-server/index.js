const { Socket } = require('socket.io');

const app = require('express')();
const http = require('http').Server(app);
const io = require ('socket.io')(http,{
    cors:{
        origin: true,
        credentials: true,
        methods: ["GET","POST"]
    }
});

const usuariosEnLinea = [];


io.on('connection',(socket)=>{
    console.log("Nuevo Usuario Conectado");

    socket.on("newUser",(user)=>{
        usuariosEnLinea.push(user);
    });
    socket.emit('usuarios-activos', usuariosEnLinea);

    socket.on("senMessage",(messageInfo)=>{
        console.log("Enviando un mensaje");
        console.log(messageInfo);
        socket.broadcast.emit( "receiveMessage",messageInfo);
    });

    socket.on('updateUsername', ({ oldUsername, newUsername }) => {
        console.log('Actualizando nombre de usuario:', oldUsername, 'a', newUsername);

        const index = usuariosEnLinea.indexOf(oldUsername);
        console.log("este es antiguo usuario  : " + oldUsername);
        console.log("Este es su index  : " +index);
        console.log("anterior usuario  : " + newUsername)
        if (index !== -1) {
            usuariosEnLinea[index] = newUsername;
          socket.emit('usuarios-activos', usuariosEnLinea);
        }
      });
        
    });  

    io.on('disconnect', () => {

        console.log('Usuario desconectado');
         onlineUsers = usuariosEnLinea.filter(user => user !== socket.username);
         Socket.emit('usuarios-activos', onlineUsers);
           
    });
    app.get('/getTotalUsers', (req, res) => {
        res.json({ count: usuariosEnLinea.length });
    });

http.listen(8080,()=>{
    console.log("Escuchando");
});

