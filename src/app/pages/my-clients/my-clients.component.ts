import { Component, OnInit, OnChanges } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-my-clients',
  templateUrl: './my-clients.component.html',
  styleUrls: ['./my-clients.component.scss']
})
export class MyClientsComponent implements OnInit, OnChanges {
  accounts;
  constructor(private accountService: AccountService, private clientService: ClientService) { }

  ngOnChanges(){
    this.refreshAccount();
  }

  ngOnInit() {

    this.accountService.getAccounts().subscribe(
      result => {
        this.accounts = result;
        console.log('holaaaaa', result)
      },
      err => {
        console.log('hay error');
      }
    );
  }

  refreshAccount() {
    this.accountService.getAccounts().subscribe(
      result => {
        this.accounts = result;
        //console.log('holaaaaa', result)
      });
  }

  async onDelete(data) {
    await this.clientService.deleteClient(data.id);
    await this.refreshAccount();
  }
}