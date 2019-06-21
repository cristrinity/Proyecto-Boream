import { Component, OnInit, Input, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component ({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})

export class MyAccountComponent implements OnInit{

  dataInfo;
  datos;

  
  ngOnInit(){
    this.refreshAccount();
  }
  
   refreshAccount(){
    this.datos = this.accountService.getAccount();
  }
  
  constructor(private accountService: AccountService){}


  async onDelete(data) {
    await this.accountService.deleteAccount(data.id);
    await this.refreshAccount();
  }

  onEdit(evt) {
    this.dataInfo = evt;
  }
  


}
