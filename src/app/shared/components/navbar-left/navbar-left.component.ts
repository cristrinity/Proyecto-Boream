import { Component, Input } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-navbar-left',
  templateUrl: 'navbar-left.component.html',
  styleUrls: ['navbar-left.component.scss']
})


export class NavbarLeftComponent {
  @Input() project;
  userActive;


  constructor(private authorization: AuthorizationService) {
    this.userActive = this.authorization.getId();
  }


}
