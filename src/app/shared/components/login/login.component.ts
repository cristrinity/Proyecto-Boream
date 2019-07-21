import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProjectsService } from 'src/app/services/project.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  public myForm;

  @Output() userName = new EventEmitter();
  constructor(private fb: FormBuilder, private authorization: AuthorizationService, private router: Router){}


ngOnInit(): void {
  this.myForm = this.fb.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(4)])
  ],
    pass: ['', Validators.compose([Validators.required, Validators.minLength(4)])
    ]
  }
  );
}

submit(event, form){
  if(form.valid){
    return this.authorization.login(form.value.name, form.value.pass).then(() => {
      this.userName = form.value.name;

      console.log(`ha hecho login! ${form.value.name}`);
      this.router.navigate(['/proyectos']);
    });
  }
}

}
