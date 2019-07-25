import { Component, OnInit, Input, Output, OnChanges, DoCheck, SimpleChanges } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ClientService } from 'src/app/services/client.service';
// import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})

export class MyAccountComponent implements OnInit, OnChanges { 

  @Input() client;
  dataInfo;
  datos;
  accounts;

  constructor(private accountService: AccountService, private authorization: AuthorizationService, private clientService: ClientService) {

    this.authorization.userActive.subscribe(data => {
      this.client = data;
    });

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

ngOnChanges(changes: SimpleChanges): void {
  //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //Add '${implements OnChanges}' to the class.
  this.authorization.userActive.subscribe(data => {
    this.client = data;
  });

}

  ngOnInit() {
    this.refreshAccount();
  }

  refreshAccount() {
    this.authorization.userActive.subscribe(data => {
      this.client = data;
    });
  }

  async onDelete(data) {
    await this.clientService.deleteClient(data.id);
    await this.refreshAccount();
  }

  onEdit(evt) {
    this.dataInfo = evt;
  }


}
