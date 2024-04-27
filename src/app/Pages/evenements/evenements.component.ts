import { Component, Inject,OnInit } from '@angular/core';
import {  NgIf, NgForOf, CommonModule, TitleCasePipe} from '@angular/common';
import { EVENEMENT_TOKEN, EvenementProvider } from '../../Provider/EvenementProvider';
import { Evenement } from '../../Entites/Entite/Evenement'; 


@Component({
  selector: 'app-evenements',

  providers: [EvenementProvider,  { provide: EVENEMENT_TOKEN, useValue: new EvenementProvider().evenements },TitleCasePipe],
  standalone:true,  
  templateUrl: './evenements.component.html',
  imports:[CommonModule],
  styleUrls: ['./evenements.component.scss']  
})


 
export class EvenementsComponent {
  public evenements: Evenement[];
  protected breadcrump:string[]=["accueil"];  
  protected titlecase: TitleCasePipe;


  constructor(titlecase:TitleCasePipe) {  
      this.titlecase=titlecase;

  

      const evenementProvider = new EvenementProvider();
      this.evenements = evenementProvider.evenements   ;  
        // this.evenements=evenements;  

  //  console.log(this.evenements);
 }  

ngOnInit(){  
    let path=window.location.pathname;
      path= path.substring(1,window.location.pathname.length); 
  
    if (window.location.href.indexOf(path) > -1) {
        this.breadcrump.push(decodeURIComponent(path));
    }
}


} 

 