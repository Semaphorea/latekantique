

import { Component, Inject, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Article } from '../../Entite/Article';
import { Commande } from '../../Entite/Commande';  
import { CommandeController } from "../../../Controller/commande-controller"
import { CommandeControllerService  } from '../../../Services/ControllerService/CommandeControllerService';
import { Router } from '@angular/router';



 

@Component({
  selector: 'app-panier',
  standalone: true,
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],  
  imports: [CommonModule],  
  providers:[CommandeController]


})   

export class PanierComponent {

  @Input() panier: Article[] = [];
  @Output() articleEvent = new EventEmitter<Article>();
  @Output() panierchange = new EventEmitter<Article[]>();

  @Input() showpaniercomponent: boolean;
  protected totalHT: number;
   commandeController?:CommandeController;
   commandeControllerService?:CommandeControllerService;
  protected panieruid?:number;
  protected routes?:Router;

   //protected routes:AppRoutingModule;

  constructor(commandeController:CommandeController,@Inject(Router)routes:Router,@Inject(CommandeControllerService)commandeControllerService:CommandeControllerService) {  
    this.showpaniercomponent = false;
    this.panieruid= this.uid();
    this.panier = [];  
    
    this.totalHT = this.calculatePrice();  
    this.commandeController= commandeController;    
    commandeController=this.commandeController;  
     this.commandeControllerService=commandeControllerService;  
     if(this.commandeControllerService!=undefined) this.commandeControllerService.commandeController=this.commandeController;
    console.log("panier.component"," assignation de l'instance de commandeController au Service"); 
    this.routes= routes; 

  }

  ngOnInit() { this.showpaniercomponent = false; }
  

  //AddPanier ici n'est pas utilisé puisque l'ajout des articles se fait dans article.component
  addToPanier(article: Article) {
    this.panier.push(article);
    this.articleEvent.emit(article);
    this.totalHT = this.calculatePrice();
      console.log("panier.component L53", this.panier);  
    sessionStorage.setItem('panier-'+this.panieruid,JSON.stringify(this.panier));

   console.log("stockage panier ");

  }   


  /**
   * 
   * @param panier createCommande
   * @param totalHT 
   */ 
  async createCommande(panier: Article[], totalHT: number) {
     let res:Commande|undefined;
        sessionStorage.setItem('panier-'+this.panieruid,JSON.stringify(this.panier));
        if(this.commandeController) {
        
          let panierStocked=sessionStorage.getItem('panier-'+this.panieruid);
          if(panierStocked !=null || panierStocked!=undefined){
          //res ne sert à rien mais grâce à await il permet d'attendre ici le retour de la creation de commande avant la redirection. 
          //Sinon la page Commande ne peut trouver les commandes en SessionStorage et il y a un bug d'affichage. 
          res= await  this.commandeController.createCommande(JSON.parse(panierStocked),this.calculatePrice()); 

          }
          else{

          res=await this.commandeController.createCommande(panier,this.calculatePrice());
  
                
           }
           console.log("panier.component  L92","Création de CommandeControllerService");  
          // this.commandeControllerService=new CommandeControllerService() ;
          // this.commandeControllerService?.commandeController=this.commandeController;


           console.log("panier.component L98 : ",this.commandeControllerService?.commandeController.commande); 
           console.log("panier.component L99, constructor : commandeControllerService UID", this.commandeControllerService?.uid);
           this.routes?.navigate(['commande']);
        //   window.location.href="commande";
          
     
            
  }
            
    
  }  



  deleteCommande(panier: Article[]) {
    this.panier = [];
    this.articleEvent.emit();
    this.showpaniercomponent = true;

    sessionStorage.removeItem('panier-'+this.panieruid);    

       // this.commandeController?.deleteCommande(); //gestion de l'id commande à voir+
     
    window.location.reload();

  } 

  /**
   * calculatePrice    
   * @returns price:number
   */
  calculatePrice(): number {
    let price: number = 0;

    this.panier.forEach(articles => {
      if (articles.price != null) {
        price = price + articles.price;
      }
    });

    return price;
  }  

  supprArticle(article: Article) {
    this.panier = this.panier.filter(donnees => donnees.id !== article.id);
    console.log("panier.component.ts, supprArticle L78", this.panier);
   // this.panierchange.emit(this.panier); //Ajoute  tous les articles en lieu et place des articles non supprimés.
    this.showpaniercomponent = true;        
  }

  togglePanierComponent() {
    this.showpaniercomponent = !this.showpaniercomponent;
  }

  uid(){
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000000).toString();
    const uid = parseInt(timestamp + random);
    return uid;
  }
}


