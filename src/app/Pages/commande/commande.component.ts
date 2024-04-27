import { CUSTOM_ELEMENTS_SCHEMA, Component,DoCheck, EventEmitter , Input,OnChanges,Output, SimpleChange, Inject} from '@angular/core';

import {NgForm} from '@angular/forms';
import {TitleCasePipe } from '@angular/common';
import { Commande } from '../../Entites/Entite/Commande';
import { FormAuthenticationComponent } from '../../Authentification/Component/form-authentication/form-authentication.component';
import { AuthentificationController } from '../../Authentification/Controller/authentificationController';
import { User } from '../../Authentification/Entity/User';
import { AuthService,AUTHSERVICE_TOKEN,AuthServiceFactory } from '../../Authentification/Service/AuthService';
// import { StripeComponent } from '../../Entites/Component/payment/Stripe/stripe/stripe.component';
import { CheckoutFormComponent } from '../../Entites/Component/payment/Stripe/Component/Form/checkout-form/checkout-form.component';
import { CommandeController } from '../../Controller/commande-controller';
import { CommandeControllerService } from '../../Services/ControllerService/CommandeControllerService';
import { Router } from '@angular/router';


@Component({
   
  selector: 'app-commande',
  //standalone: true,  
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss'],
  providers: [CheckoutFormComponent,
              TitleCasePipe,
              FormAuthenticationComponent,
              {provide:AUTHSERVICE_TOKEN, useFactory:AuthServiceFactory} ,
             
           
  ],
//  schemas:[CUSTOM_ELEMENTS_SCHEMA]     
})

 

export class CommandeComponent {


  
  protected breadcrump: string[] = ["accueil"];  
  protected router:Router;
  public titlecasepipe: TitleCasePipe;
  protected user?: User;
  @Input() authentification: boolean;
  @Output() authentificationChange:EventEmitter<boolean>= new EventEmitter <boolean> ();
  @Input () currency :string="EUR";      
  @Output () currencyChange :EventEmitter<string> = new EventEmitter<string>;       

  authentificationController: AuthentificationController;
  commandeController!:CommandeController;  
  commandeControllerService!:CommandeControllerService; 
  protected paimenttype!: string;
  commande!: Commande;

  

  constructor(  
    auth:  AuthService   ,
    authentificationController: AuthentificationController,
    titlecasepipe: TitleCasePipe,
    @Inject(CommandeControllerService)commandeControllerService:CommandeControllerService,  
    @Inject(Router)router:Router,

  ) {

    this.commandeControllerService=commandeControllerService;    
    this.titlecasepipe = titlecasepipe; 

    this.authentificationController =new AuthentificationController(auth); 
    //  console.log(this.authentificationController);
    this.authentification = this.authentificationController.authentification;
    this.authentificationChange.emit(this.authentification);
    // console.log("commande.component L64 constructor this.authentification", this.authentification);
    let currentHash = sessionStorage.getItem('currentHash');
    let command: string | null;
    
    command = sessionStorage.getItem("commande-temporaire-" + currentHash);
    
    //console.log("commande.component constructor L70 : ", command);
    if (command != null) this.commande = JSON.parse(command);
    console.log("commande.component constructor L72 : ", this.commande);

   this.commandeController= this.commandeControllerService.commandeController;  
   console.log("commande.component L80, constructor : commandeControllerService UID", this.commandeControllerService.uid);
  //  console.log("commande.component L81, constructor : controller - commandeController",this.commandeController); 
   this.router=router;
  }



  buy(commande: Commande, f: NgForm) { 
    sessionStorage.setItem(this.paimenttype, f.value.paiementtype);
    //Service de Paiment
    this.router.navigate(["paiement"]);  
    // window.location.href = "paiement";
  

  }

 
  ngOnInit(): void {
    this.authentification = false;
    let path = window.location.pathname;
    path = path.substring(1, window.location.pathname.length);

    if (window.location.href.indexOf(path) > -1) {
      this.breadcrump.push(decodeURIComponent(path));
    }
    if (window.location.href.indexOf('commande') > -1) {
      document.documentElement.style.setProperty('--body-size', '150rem');
    }
  }


ngOnChanges(changes:SimpleChange){

  console.log(changes);  
}

  ngDoCheck(){

    // this.authentificationController.authentification=this.authentification;
    // console.log("commande.component check authentification : ",this.authentification);  
    // console.log("commande.component check authentification controller: ",this.authentificationController.authentification);  
  }

  ngAfterViewInit() {
   
  }
}

