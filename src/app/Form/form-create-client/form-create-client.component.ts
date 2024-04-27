import { Component, CUSTOM_ELEMENTS_SCHEMA , ElementRef, Injector, Input, OnDestroy, OnInit, StaticProvider, ViewEncapsulation } from '@angular/core';
import { FormsModule, FormControl,FormGroup,NgForm , ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn}  from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { Client } from '../../Entites/Entite/Client';
import { User } from '../../Authentification/Entity/User';
import { FormCreateClientController } from '../../Controller/form-createclient-controller';
import { ApiService } from '../../Services/apiService';
import { Address } from '../../Entites/Entite/Address';
import { Observable } from 'rxjs';
import {ModalService }from '../../Authentification/Service/modalService'

@Component({
  selector: 'app-form-create-client',  
  standalone:true,
  imports : [ FormsModule, ReactiveFormsModule , CommonModule],
  providers:[{provide: Observable, useValue: Observable}],
  templateUrl: './form-create-client.component.html',  
  styleUrls: ['./form-create-client.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],  
  encapsulation:ViewEncapsulation.None
})
export class FormCreateClientComponent implements OnInit,OnDestroy{

  protected confirmedPassword:string=""; 
  protected client:Client;  
  protected user:User;
  protected apiService:ApiService;   
  protected address:Address;
  protected billingAddress:Address; 
  closeResult: string=""; 
    
           

  @Input() id:string=""; 
  private element:any;
  protected formPasswordGroup:FormGroup;
  protected formController!:FormGroup;
  
    constructor( private modalService:ModalService, private el:ElementRef){ 
      const providers: StaticProvider[] = [
        { provide: ApiService, useClass: ApiService }]
         const injector = Injector.create({ providers });
         this.apiService = injector.get(ApiService);   
         this.client=new Client() ;  
         this.address=new Address();
         this.billingAddress=new Address();  
         this.user= new User();  
           
          //Implementation modal
          this.element=el.nativeElement; 


          this.formPasswordGroup= new FormGroup({
               password: new FormControl(),
               confirmpassword: new FormControl()},{validators:this.passwordConfirmedValidator}
          );
          //this.formController= new FormGroup();
          }

        
 // remove self from modal service when component is destroyed
 ngOnDestroy(): void {
  this.modalService.remove(this.id);
  this.element.remove();
}


  ngOnInit(): void {
  // ensure id attribute exists
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        // move element to bottom of page (just before </body>) so it can be displayed above everything else
        document.body.appendChild(this.element);
  
        // close modal on background click
        this.element.addEventListener('click', (el:any)=> {
            if (el.target.className === 'viewmodalnewclient') {
                this.close();
            }
        });

        // add self (this modal instance) to the modal service so it's accessible from controllers
        this.modalService.add(this);
  }


    public  onSubmit(f : NgForm){
      console.log("form-create-client.component L35 : value  NgForm : ",f); 
      let formCreateClientController= new FormCreateClientController(this.apiService);
      formCreateClientController.setValues(f);   
   
    }



     // open modal
     open(): void {
      this.element.style.display = 'block';
      document.body.classList.add('viewmodalnewclient-open');
  }

  // close modal
  close(): void {
      this.element.style.display = 'none';
      document.body.classList.remove('viewmodalnewclient-open');
  }


  //Validator
  passwordConfirmedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmpassword = control.get('confirmpassword');  
  
    return password!.value === confirmpassword!.value ? { passwordConfirmed: true } : null;
  };    

}
 
