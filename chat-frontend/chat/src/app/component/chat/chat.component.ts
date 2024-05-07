import { Component, OnInit, OnDestroy,ViewChild  } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit,OnDestroy {

 text="";
  //newUser="";
  editedUser =this.chat.user;

  constructor( public chat: ChatService) { }
  ngOnDestroy(): void {
    this.chat.destroy();
  }

  ngOnInit(): void {
    
  }
  
  sendMessage(){
    let messageInfo={
      texto: this.text,
      messageType:1,
      username:this.chat.user
      
    };
    this.chat.senMessage(messageInfo);
    this.text="";
  }

  getOnlineUsers(): string[] {
    return this.chat.onlineUsers;
  }

  checkUserEdit() {
    if (this.chat.user !== this.editedUser) {
      this.chat.updateUsername(this.editedUser);
    }
  }

}