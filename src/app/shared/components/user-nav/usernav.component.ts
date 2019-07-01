import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';

@Component ({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls:  ['./usernav.component.scss']
})

export class UsernavComponent implements OnInit{

  @Input() userId;
  @Input() userName;
  usuario;
  useractive;
  userActive;
  id;

constructor(private clientService: ClientService, private authorization: AuthorizationService, private router: Router){}

ngOnInit(){
  this.userActive = this.authorization.getId();
  this.id = this.authorization.getId();
  this.myClients(this.userId);
}

 async myClients(id){
   this.useractive = await this.clientService.getClientById(id);
   console.log(this.useractive);
   this.usuario = this.useractive[0];
   //this.useractive[0].id;
   console.log('soy el usuario: ', this.userActive);
   //debugger
}

checkout(){
  this.authorization.logout();
  localStorage.token = '';
  localStorage.id = '';
  this.router.navigate(['/login']);
}

}
