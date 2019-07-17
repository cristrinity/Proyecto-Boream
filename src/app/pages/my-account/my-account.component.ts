import { Component, OnInit, Input, Output } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ClientService } from 'src/app/services/client.service';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})

export class MyAccountComponent implements OnInit {

  @Input() client;
  dataInfo;
  datos;
  accounts;
  observer;
  constructor(private accountService: AccountService, private authorization: AuthorizationService, private clientService: ClientService) {

    this.authorization.observer.subscribe(data => {
      this.client = data;
      console.log('vengo de authorization y soy data', data) // Trae id de usuario (0, 1, 2)
    })

    this.accountService.getAccountByClient(this.client).subscribe(
      result => {
        this.accounts = result;
        console.log('holaaaaa', result)
      },
      err => {
        console.log('hay error');
      }
    );
  }

  ngOnInit() {
    this.refreshAccount();
  }

  refreshAccount() {
    this.authorization.observer.subscribe(data => {
      this.client = data;
    })
  }

  async onDelete(data) {
    await this.clientService.deleteClient(data.id);
    await this.refreshAccount();
  }

  onEdit(evt) {
    this.dataInfo = evt;
  }


}
