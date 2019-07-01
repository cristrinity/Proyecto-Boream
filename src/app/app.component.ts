import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavbarLeftComponent } from './shared/components/navbar-left/navbar-left.component';
import { AuthorizationService } from './services/authorization.service';
import { ProjectsService } from './services/project.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnChanges {
  title = 'ProyectoPersonalNG';
  url;
  hideComponent;
  userActive;
  @Input() userId;
  @Input() userName;
  @Input() client;
  @Input() datos;
  ngOnChanges() {
  }

  constructor(private router: Router, private authorizationService: AuthorizationService, private projectservice: ProjectsService) {
  }
  ngOnInit() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.router.url)
        if (this.router.url === '/login' || this.router.url === '/') {
          this.hideComponent = false;
        } else {
          this.hideComponent = true;
        }
      }
    })
  }
}