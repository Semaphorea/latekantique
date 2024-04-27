import { CUSTOM_ELEMENTS_SCHEMA, Component,  Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Commande } from '../../Entite/Commande';
import { FormsModule, NgForm,NgModel } from '@angular/forms';
import { CurrencyComponent} from '../../../Form/form-currency/from-currency.component';
import { CommandeController } from '../../../Controller/commande-controller';
import { CommandeControllerService  } from '../../../Services/ControllerService/CommandeControllerService';
import { inspect } from 'util';
import { Router } from '@angular/router';

@Component({  
  selector: 'app-overviewcommande',
  standalone: true,
  templateUrl: './overviewcommande.component.html',
  styleUrls: ['./overviewcommande.component.scss'],
  imports: [CommonModule, FormsModule,CurrencyComponent],
  providers:[CurrencyComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]



})
export class OverviewcommandeComponent {

  @Input() authentification!: boolean;
  @Input() commande!: Commande;
  @Input() currency!:string;   
  commandeController:CommandeController;
  commmandeControllerService:CommandeControllerService;
  currencylast:string; 

  paimenttype!: string;  
  message!: string;  
  protected router:Router;  

  constructor(protected currencyComp:CurrencyComponent,router:Router,@Inject(CommandeControllerService)commandeControllerService:CommandeControllerService) { 
   this. commmandeControllerService=commandeControllerService;

    this.authentification=this.authentification;
    console.log("overviewcommande constructor L39,  check authentification  : ",this.authentification);  
    console.log("overviewcommande constructor L40, commande : ",this.commande);  
   
    this.currencylast=this.currency='EUR';  
    // console.log("overviewcommande L45 : ",inspect(  this. commmandeControllerService ));  
    this.commmandeControllerService=  this. commmandeControllerService; 
    this.commandeController=  this. commmandeControllerService.commandeController; 
    // console.log("Overviewcommande.component L44 , CommandeContollerService : ",this.commandeController);   
    this.router=router;
   }


  public onSubmit(f: NgForm, commande: Commande) { 

    //envoie vers la page paiment component  
    if (sessionStorage.getItem("token") != null) {  
      this.authentification = true;
      console.log("overviewcommande L36", "tocken est attribué.")
    };

    if (this.authentification === true) {
      sessionStorage.setItem("paimenttype", f.value.paimenttype);
      console.log('overviewcommande.componenents L56 : ',commande);  
      this.commandeController.persist(commande);
      
      //Persistance en fichier mock ou base de donnee  
      this.router?.navigate(['paiement']);
      //window.location.href = "\paiement";      
    }  
    else { this.message = "Vous n'êtes pas connecté"; }

   
  }



async onCurrencyChange(){  
  
  try{  
        
    console.log("overviewcommande.component L86 , currency :",this.currency+" basecurrency : "+this.currencylast);  
    
      
            this.commande.articles.forEach(async(element)=> {  
              element.price= await this.currencyComp.exchange(element.price!,[this.currencylast,this.currency]);                    
            });                
            
            this.commande.totalHT= await this.currencyComp.exchange(this.commande.totalHT!,[this.currencylast,this.currency]);
            this.commande.insurance= await this.currencyComp.exchange(this.commande.insurance!,[this.currencylast,this.currency]);  
            // console.log(ins);
            this.commande.totalTTC = await this.currencyComp.exchange(this.commande.totalTTC!,[this.currencylast,this.currency]);
            // console.log(totalTTC);
            this.commande. shipping= await this.currencyComp.exchange(this.commande.shipping!,[this.currencylast,this.currency]);
            // console.log(shipping);
            this.commande. shipping_tax= await this.currencyComp.exchange(this.commande.shipping_tax!,[this.currencylast,this.currency]);    
            // console.log(shipping_tax);     
            
            this.currencylast= this.currency;      
            console.log("lastcurrency :", this.currencylast ) ; 
        }catch(error:any){console.error('overviewcommande.component L85, error : ', error );
      
     
    }
  
}

    
  }