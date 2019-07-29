import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CheckFormsService {

    checking = new BehaviorSubject(false);

}