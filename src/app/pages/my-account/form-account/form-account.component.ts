import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component ({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss']
})

export class FormAccountComponent implements OnInit, OnChanges{

  myForm;
  accountCopy;

  @Input () accountToEdit;
  @Output() saveAccount = new EventEmitter();

constructor(private fb: FormBuilder, private accountService: AccountService){}

ngOnChanges(changes: SimpleChanges) {
  this.accountCopy = {...changes.accountToEdit.currentValue};
}


ngOnInit(){
  this.myForm = this.fb.group({
    name: [''],
    nif: [''],
    email: [''],
    phone: [''],
    address: [''],
    avatar: ['']
  });


if (this.accountToEdit){

  this.myForm.setValue({
    name: this.accountToEdit.name,
    nif: this.accountToEdit.nif,
    email: this.accountToEdit.email,
    phone: this.accountToEdit.phone,
    address: this.accountToEdit.address,
    avatar: this.accountToEdit.avatar,
   
  });
}

}

public submit(e, form){
if (form.valid) {
  if(this.accountToEdit){
    this.accountService.editAccount(this.accountToEdit.id, form.value);
  }else{
    this.accountService.addAccount(form.value);
  }
}
}


}