import { Component, ElementRef, ViewChild } from '@angular/core';
import { Estimation } from '../../Entites/Entite/Estimation';
import { AbstractControl, FormBuilder, FormGroup, FormsModule,FormControl, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { FormEstimationController } from '../../Controller/form-estimation-controller';
import { EmailService } from '../../Services/emailService';
import { LoggerService } from '../../Services/logger.service';
import { FormEstimationController } from '../../Controller/form-estimation-controller'; 
import { Client } from '../../Entites/Entite/Client';
import { Observable } from 'rxjs';

@Component({

  selector: 'app-form-estimation',
  templateUrl: './form-estimation.component.html',
  standalone:true,  
  styleUrls: ['./form-estimation.component.scss'],
  imports : [ FormsModule, CommonModule,ReactiveFormsModule, EmailService ],  

})

export class FormEstimationComponent {

  @ViewChild('photosInput') photos!: ElementRef;
  estimation= new Estimation(null, null,null,null,null,null,null,null,null,null,null,null);
  client!:Client;
  emailService:EmailService;
  protected form: FormGroup;


constructor( emailService:EmailService ,private formbuilder: FormBuilder,
  private loggerService?:LoggerService
){  
    this.emailService=emailService;
    this.client= new Client(null,null,null);
    this.form = this.initiateFormBuilder();
}


  /**
   * Function initiateFormBuilder
   * @returns FormGroup<any>  
   */
  initiateFormBuilder(): FormGroup<any> {
    return this.formbuilder.group({
      firstname: ['', Validators.required, this.myAsyncValidator],
      lastname: ['', Validators.required, this.myAsyncValidator],
      email: ['', Validators.required, this.myAsyncValidator],
      articleName: ['', Validators.required, this.myAsyncValidator],
      features: ['', Validators.required, this.myAsyncValidator],
      defaults: ['', Validators.required, this.myAsyncValidator],
      signature: ['', Validators.required, this.myAsyncValidator],
      author: ['', Validators.required, this.myAsyncValidator],
      creationYear: ['', Validators.required, this.myAsyncValidator],
      firstCommercializationYear: ['', Validators.required, this.myAsyncValidator],
      photos: ['', Validators.required, this.myAsyncValidator],
      
    });
 

  }

onSubmit(form:NgForm){  
  
  //if(this.formbuilder.control('',Validators.required, this.myAsyncValidator)){return ;}


  let fecontroller= new FormEstimationController(undefined,this.loggerService);
                     //  const selectedFiles: FileList = this.photos.photos.files;
   const selectedFiles: FileList = this.photos.nativeElement.files;
   const fileUrls: string[] = [];
   
       console.log("L37 Form-estimation.components.ts");
       console.log(selectedFiles); 
     
      fecontroller.setValue(form,selectedFiles); 
      

     
      if(fecontroller.estim != null){ 
          fecontroller.getLastId().subscribe({next:(value)=>{console.log('form-estimation.component.ts L53',value); fecontroller.estim!.id=value.id;},
                                              error:(error:any)=>{console.error('form-estimation.component.ts L53 Error : ', error )},
                                              complete:()=>{console.log("form-estimation.component.ts L53 observer complete");} 
                                            });
          //console.log("form-estimation.component.ts L54 ",fecontroller.estim); 
        }                
          this.emailService.send(fecontroller.instanciateEmail());      
}  

onReset() {
      this.form.reset();
}

ngOnInit(){
  let path=window.location.pathname;
  path=path.substring(1,window.location.pathname.length); 
  if (window.location.href.indexOf(path) > -1) {  
    document.documentElement.style.setProperty('--body-size', '125rem');  
  }
 
}



/**
   * Function myAsyncValidator
   * @param control 
   * @returns 
   */
myAsyncValidator = (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
  return new Observable(observer => {

    let r = new RegExp('.*@.*\.\w{2|3}');
   
    console.log('form-contact component L43', control.get('address')?.value);
    // Perform asynchronous validation here
    if (control.get('firstname')?.value.length < 64 || control.get('lastname')?.value.length < 64 || r.test(control.get('email')?.value) ||
      control.get('articleName')?.value.length < 64 || control.get('features')?.value.length < 256 || control.get('defaults')?.value.length < 256 ||
      control.get('signature')?.value.length < 64 || control.get('author')?.value.length < 64|| control.get('creationYear')?.value.length <= 4 ||
      control.get('photo')?.value != null) {
      observer.next(null);  
    } else {
      observer.next({ myError: true });
    }
    observer.complete();
  });
};

}
