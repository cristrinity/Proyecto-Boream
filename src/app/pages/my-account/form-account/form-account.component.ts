import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component ({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styleUrls: ['./form-account.component.scss']
})

export class FormAccountComponent implements OnInit, OnChanges{
//myForm;
  
  @Input() accountToEdit;
  @Output() saveAccount = new EventEmitter();

  accountCopy;

constructor(private fb: FormBuilder, private accountService: AccountService){}

ngOnChanges(changes: SimpleChanges) {
  this.accountCopy = {...changes.accountToEdit.currentValue};
}

   myForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    logo: new FormControl(''),
    data_contact: new FormGroup({
      name: new FormControl(''),
      emailc: new FormControl(''),
      tel: new FormControl(''),
      address: new FormControl(''),
      cp: new FormControl(''),
      city: new FormControl(''),
      data_invoice: new FormGroup({
        company: new FormControl(''),
        cif: new FormControl(''),
        emaili: new FormControl(''),
        teli: new FormControl(''),
        addressi: new FormControl(''),
        cpi: new FormControl(''),
        cityi: new FormControl(''),
      })
    })
  });


ngOnInit(){
  this.myForm = this.fb.group({
    username: [''],
    password: [''],
    email: [''],
    data_contact: this.fb.group({
    name: [''],
    emailc: [''],
    tel: [''],
    address: [''],
    cp: [''],
    city: ['']}),
    data_invoice: this.fb.group({
    company: [''],
    cif: [''],
    emaili: [''],
    teli: [''],
    addressi: [''],
    cpi: [''],
    cityi: ['']}),
    logo: [''],
  });


if (this.accountToEdit){

  
  this.myForm.setValue({
    username: this.accountToEdit.username,
    password: this.accountToEdit.password,
    email: this.accountToEdit.email,
    logo: this.accountToEdit.logo,
    data_contact: {
    name: this.accountToEdit.data_contact.name,
    emailc: this.accountToEdit.data_contact.emailc,
    tel: this.accountToEdit.data_contact.tel,
    address: this.accountToEdit.data_contact.address,
    cp: this.accountToEdit.data_contact.cp,
    city: this.accountToEdit.data_contact.city },
    data_invoice: {
    company: this.accountToEdit.data_invoice.company,
    cif: this.accountToEdit.data_invoice.cif,
    emaili: this.accountToEdit.data_invoice.emaili,
    teli: this.accountToEdit.data_invoice.teli,
    addressi: this.accountToEdit.data_invoice.addressi,
    cpi: this.accountToEdit.data_invoice.cpi,
    cityi: this.accountToEdit.data_invoice.cityi},
  });
}

}

public submit(_id, form){
if (form.valid) {
  if(this.accountToEdit){
    this.accountService.editAccount(this.accountToEdit._id, form.value);
    console.log('soy formvalue', form.value)
  }else{
    this.accountService.addAccount(form.value);
  }
}
}


}