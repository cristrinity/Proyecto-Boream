import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../services/account.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html'
})

export class EditAccountComponent implements OnInit{
  accountSelected;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService
  )
  {}


ngOnInit() {
  this.activatedRoute.params.subscribe((data) => {
    this.accountService.getAccountById(data.id).then(account => {
      this.accountSelected = account;
      console.log('soy la accountSelected', this.accountSelected)
     });
    });
  }
}
