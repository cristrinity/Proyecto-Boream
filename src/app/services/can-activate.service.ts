import { Injectable } from '@angular/core';
import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot } from '@angular/router';

@Injectable()

export class ActivateGuard implements CanActivate {

  constructor() {}

canActivate(
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(`Vamos a ${route.url}`);
    console.log(`Vamos ${state}`);
    return true;
}

}
