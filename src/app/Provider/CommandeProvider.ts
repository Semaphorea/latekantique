import { ApiService } from '../Services/apiService';
import { Injector, StaticProvider } from '@angular/core'; 
import { Injectable, InjectionToken,NgModule } from '@angular/core';
import { Commande} from '../Entites/Entite/Commande';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

export const COMMANDE_TOKEN = new InjectionToken<Commande>('COMMANDE_TOKEN') ;  

export function CommandeFactory(id:number):Observable<Commande>{
      let compro=new CommandeProvider();
      let commande=compro.fetchCommande(id);
//      console.log("CommandeProvider CommandesFactory", commande );
      return commande; 
}

export function CommandesFactory():Observable<Commande[]>{
    let compro=new CommandeProvider();
    let commandes= compro.fetchCommandes();
    console.log("CommandeProvider CommandesFactory", commandes );
    return  commandes;
}

@Injectable({
    providedIn: 'root', 
   
  })
export class CommandeProvider{  

    public commande!:Commande|null;
    public commandes!:Observable<Commande[]>;
    private apiService!:ApiService;

       public constructor (){

           const providers: StaticProvider[] = [
          { provide: ApiService, useClass: ApiService }]
           const injector = Injector.create({ providers });
           this.apiService = injector.get(ApiService);     
           this.commandes=this.fetchCommandes();         

       }

   
       public fetchCommandes():Observable<Commande[]>{                 
         let ret=this.apiService.sendData('commandes','GET'); 
        return ret;
       }


       public fetchCommande(id:number):Observable<Commande>{              
        let ret=this.apiService.sendData('commandes/'+id,'GET');  
        return ret;
       }     


      protected fetchCommandeIdClient(id:number,idClient:number):Observable<Commande>{              
        let ret=this.apiService.sendData('commandes/id='+id+"&idClient="+idClient,'GET');  
        return ret;
      }



}