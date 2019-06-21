import { Component, OnChanges, OnInit, Input } from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import { NavbarLeftComponent } from './shared/components/navbar-left/navbar-left.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges{
  title = 'ProyectoPersonalNG';
  url;
  hideComponent;
  @Input() userId;
  @Input() userName;

ngOnChanges(){
}

  constructor(private router: Router) {
  }

nombres = this.userId;
  ngOnInit() {
  console.log(this.userName, 'desde app component')
    console.log(this.router)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.router.url)
        if (this.router.url === '/login' || this.router.url === '/') {
          this.hideComponent = false;
        } else {
          this.hideComponent = true;
        }
  console.log(this.userName, 'desde app component')

      }
    })
  }
}
