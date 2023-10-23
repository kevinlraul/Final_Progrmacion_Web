import { Component, OnInit  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { Users } from '../user';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  users: Users[] = []
  receiver: any;
  receiverData: any;
  imagen : boolean =false ; 
  myToken: any;
  mensajeChat: any;
  mensaje: any = '';

  constructor(private dataService: ApiService, private route: ActivatedRoute) { }

  getUsers() {
    this.dataService.getUsuarios()
      .subscribe({
        next: (response) => {
          this.users = response?.filter((items:any )=> items.id!=this.myToken );
          this.receiverData = response.find((res: any) => res.id == this.receiver)
         // console.log(response?.filter((items:any )=> items.id!=this.myToken )) para ver si me trae vien a los usuarios 
        },
        error: (e) => { }
      });
  }

  getChatData() {
    this.dataService.getChat(this.receiver, this.myToken)
      .subscribe((response) => {
        this.mensajeChat = response?.map((res: any) => {
          let chat = res;
          chat.sender = this.users?.find((user) => user.id == chat?.sender_id)?.name
          chat.receiver = this.users?.find((user) => user.id == chat?.receiver_id)?.name
          return chat
        });
      });
  }

  getMensaje(e: any) {
    this.mensaje = e.target.value
  }

  getAgregarMensaje() {
    this.dataService.getAgregarMensaje(this.myToken, this.receiver, this.mensaje)
      .subscribe(() => {
        this.getChatData();
        this.mensaje = '';
      });
  }
  
  ngOnInit(): void {
    this.receiver = this.route.snapshot.paramMap.get('id');
    this.myToken = this.dataService.getToken();
    this.getUsers();
    this.getChatData()
  }

}
