import { Injectable } from '@angular/core';
import { text } from 'express';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io = io ("http://localhost:8080/",{
    withCredentials:true,
    autoConnect: true
  });
  

  constructor() { 
  
  }
}
