import { Component, Input,Output,EventEmitter,CUSTOM_ELEMENTS_SCHEMA, ViewChild,AfterViewInit, TemplateRef, ViewContainerRef, inject, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormsModule, ReactiveFormsModule } from '@angular/forms';   
import { FormCreateClientComponent } from "../../../Form/form-create-client/form-create-client.component";
import { Router } from '@angular/router';    

 

import { NgIf } from '@angular/common'; 
import { AuthentificationController } from '../../Controller/authentificationController'; 
import { ModalService } from '../../Service/modalService';


@Component({
  selector: 'app-form-authentication',
  standalone:true,
  imports: [FormsModule, ReactiveFormsModule,NgIf,AuthentificationController,FormCreateClientComponent], 
 // providers:[FormCreateClientComponent],
  templateUrl: './form-authentication.component.html',
  styleUrls: ['./form-authentication.component.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]   
})
export class FormAuthenticationComponent implements AfterViewInit{

  @Input() public authentification?:boolean;    
  @Input() authentificationController?: AuthentificationController;  
  @Output() public authentificationMessageEvent= new EventEmitter<string>();  
  @Output() public authentificationChange:EventEmitter<boolean>= new EventEmitter<boolean>();  
  authentificationMessage:string="";
  newclientview : boolean= false;  
  form: FormGroup;
  
    

 
  constructor(
    private formbuilder: FormBuilder,    
    private router: Router,
    authentificationController :AuthentificationController,
    private modalService:ModalService
  
    ) {
      this.authentificationController=authentificationController;
      
      this.form = this.formbuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
        
      });
      this.authentification=authentificationController.authentification;
   
   
  }

  ngOnInit() {
   
  }

  async authenticate() {
    const val = this.form.value;

    //console.log("form-authentification L62",val.email);
    //console.log("form-authentification L62",val.password);
       this.authentification= await this.authentificationController?.authenticate(val.email,val.password);


     
        let userid= this.authentificationController?.user.id

        console.log(" form-authentification L47 : ",userid);  
  
        if(userid!=null){ this.authentification=true;
                          this.authentificationMessage = "Vous êtes connectés !";
                        }    
        else{ this.authentificationMessage = "Vos identifiant et/ou mot de passe n'ont pas été trouvés en base de donnée, merci de créer un nouveau compte ! ";}
           console.log("form-authentification.component this.authentification", this.authentification);
        this.authentificationChange.emit(this.authentification);
    }

  ngAfterViewInit(){      
        // console.log("form-authentification.components L80",this.viewmodalnewclient); 
  }

   newclient(){
    

   }


   openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}



   
  }

  
    


