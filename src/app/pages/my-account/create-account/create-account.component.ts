import { Component, Input } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html'
})

export class CreateAccountComponent {
  accountInfo: any;
  @Input() client;

  constructor(private accountService: AccountService) {}


  onSaveProject(account) {
    if(this.accountInfo) {
      this.accountService.editAccount(this.accountInfo.id, account);
      this.accountInfo = null;
    }else{
      this.accountService.addAccount(account);
    }
  }

}
