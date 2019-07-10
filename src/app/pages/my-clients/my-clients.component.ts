import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-my-clients',
  templateUrl: './my-clients.component.html',
  styleUrls: ['./my-clients.component.scss']
})
export class MyClientsComponent implements OnInit {
  accounts;
  constructor(private accountService: AccountService) { }

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
}