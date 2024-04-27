import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, FormGroup, FormBuilder, Validators, NG_ASYNC_VALIDATORS, AbstractControl, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Email } from '../../Entites/Entite/Email';
import {  Observable } from 'rxjs';
// import { ApiService } from '../../Services/apiService';
import { EmailService,EMAILSERVICE_TOKEN } from '../../Services/emailService';


@Component({
  selector: 'app-form-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-contact.component.html',
  styleUrls: ['./form-contact.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    // ApiService
    {provide:EMAILSERVICE_TOKEN , useClass:EmailService}  
  ]
})
export class FormContactComponent {
  // protected apiService: ApiService;
  protected email!: Email;
  protected emailService:EmailService;       
  protected form: FormGroup;


  public constructor(private formbuilder: FormBuilder,
     emailS:EmailService   
  ) {

     this.emailService=emailS;     
     this.form = this.initiateFormBuilder();
  }

  /**
   * Function submit
   */
  public async submit() {

    let value = this.form.value;
    if (value != null) { this.email = new Email({ firstname: value.firstname.toString(), lastname: value.lastname.toString(), address: value.address.toString(), subject: value.subject.toString(), message: value.message.toString() }); }
    // console.log("form-contact.component L49 : ", this.email);
    this.emailService.send(this.email);  
    
 
  }


  /**
   * Function initiateFormBuilder
   * @returns FormGroup<any>  
   */
  initiateFormBuilder(): FormGroup<any> {
    return this.formbuilder.group({
      // firstname: ['', Validators.required,Validators.maxLength(64)],
      // lastname: ['', Validators.required,Validators.maxLength(64)],
      // address: ['', Validators.required, Validators.email],
      // subject: ['', Validators.required, Validators.maxLength(256)],
      // message: ['', Validators.required, Validators.maxLength(512)],  


      firstname: ['', Validators.required, this.myAsyncValidator],
      lastname: ['', Validators.required, this.myAsyncValidator],
      address: ['', Validators.required, this.myAsyncValidator],
      subject: ['', Validators.required, this.myAsyncValidator],
      message: ['', Validators.required, this.myAsyncValidator],

    });


  }  

  /**
     * Function myAsyncValidator
     * ToCheck, Validation behavior abnormal. 27/12/2023
     * @param control 
     * @returns 
     */
  myAsyncValidator = (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
    return new Observable(observer => {

      let r = new RegExp('.*@.*\.\w{2|3}');

      console.log('form-contact component L43', control.get('address')?.value);
      // Perform asynchronous validation here
      if (control.get('firstname')?.value.length < 64 || control.get('lastname')?.value.length < 64 || r.test(control.get('address')?.value) || control.get('subject')?.value.length < 256 || control.get('message')?.value.length < 512) {
        observer.next(null);
      } else {
        observer.next({ myError: true });
      }
      observer.complete();
    });
  };

}
