import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chats: any[] = [];
  onlineUsers: string[] = [];
  user = '';

  constructor(public socket: SocketService) {
    this.onReceiveMessage();
    this.newUser();
    this.onOnlineUsers();
  }

  senMessage(messageInfo: any) {
    this.chats.push(messageInfo);
    this.socket.io.emit('senMessage', messageInfo);
  }

  onReceiveMessage() {
    this.socket.io.on('receiveMessage', (messageInfo) => {
      messageInfo.messageType = 2;
      this.chats.push(messageInfo);
    });
  }

  onOnlineUsers() {
    this.socket.io.on('usuarios-activos', (onlineUsers) => {
      this.onlineUsers.splice(0, this.onlineUsers.length);
      onlineUsers.forEach((username: string) => {
        this.onlineUsers.push(username);
      });
    });
  }

  newUser() {
    let randomNum = Math.floor(Math.random() * 1000) + 1;
    this.user = `User${randomNum}`;
    this.socket.io.emit('newUser', this.user);
  }
  destroy() {
    this.socket.io.emit('eliminar-usuario', this.user);
    this.socket.io.disconnect();
  }
/*********************************************************************************************************************/
  listUser() {
    const indice = this.onlineUsers.indexOf(this.user);
    
    if (indice !== -1) {
      alert(`El usuario se encuentra en el índice ${indice}.`);
    } else {
      alert(`El usuario no se encuentra en el array.`);
    }
  }

  updateUsername(newUsername: string) {
    this.socket.io.emit('updateUsername', { oldUsername: this.user, newUsername: newUsername });
    this.user = newUsername;
  }
}
