import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component ({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss']
})

export class FormAccountComponent implements OnInit, OnChanges{

  
  @Input() accountToEdit;
  @Output() saveAccount = new EventEmitter();
  myForm;
  accountCopy;

constructor(private fb: FormBuilder, private accountService: AccountService){}

ngOnChanges(changes: SimpleChanges) {
  this.accountCopy = {...changes.accountToEdit.currentValue};
}


ngOnInit(){
  this.myForm = this.fb.group({

    username: [''],
    password: [''],
    email: [''],
    name: [''],
    emailc: [''],
    tel: [''],
    address: [''],
    cp: [''],
    city: [''],
    company: [''],
    cif: [''],
    emaili: [''],
    teli: [''],
    addressi: [''],
    cpi: [''],
    cityi: [''],
    logo: [''],
  });


if (this.accountToEdit){

  this.myForm.setValue({
    username: this.accountToEdit.username,
    password: this.accountToEdit.password,
    email: this.accountToEdit.email,
    name: this.accountToEdit.data_contact.name,
    emailc: this.accountToEdit.data_contact.emailc,
    tel: this.accountToEdit.data_contact.tel,
    address: this.accountToEdit.data_contact.address,
    cp: this.accountToEdit.data_contact.cp,
    city: this.accountToEdit.data_contact.city,
    company: this.accountToEdit.data_invoice.company,
    cif: this.accountToEdit.data_invoice.cif,
    emaili: this.accountToEdit.data_invoice.emaili,
    teli: this.accountToEdit.data_invoice.teli,
    addressi: this.accountToEdit.data_invoice.addressi,
    cpi: this.accountToEdit.data_invoice.cpi,
    cityi: this.accountToEdit.data_invoice.cityi,
    logo: this.accountToEdit.logo
  });
}

}

public submit(_id, form){
if (form.valid) {
  if(this.accountToEdit){
    this.accountService.editAccount(this.accountToEdit._id, form.value);
  }else{
    this.accountService.addAccount(form.value);
  }
}
}


}