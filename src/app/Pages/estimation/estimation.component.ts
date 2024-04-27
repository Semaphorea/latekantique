import { Component, Inject, OnInit} from '@angular/core';
import { NgFor , NgIf, TitleCasePipe} from '@angular/common';
import { Expert } from '../../Entites/Entite/Expert' ;
import { Address } from '../../Entites/Entite/Address' ;
import { ExpertProvider , EXPERT_TOKEN } from '../../Provider/ExpertProvider' ;
import { CapitalizePipe } from '../../Services/capitalize.service';
  
@Component({
  selector: 'app-estimation', 
  templateUrl: './estimation.component.html',  
  styleUrls: ['./estimation.component.scss'],
 // providers :[ ExpertProvider , {provide :  EXPERT_TOKEN, useValue: new ExpertProvider().experts} ],
   providers: [ExpertProvider, { provide: EXPERT_TOKEN, useExisting: ExpertProvider },CapitalizePipe,TitleCasePipe] 
})
  

export class EstimationComponent implements OnInit{

  protected breadcrump:string[]=["accueil"];  
  protected experts:Expert[]=[];      
  protected expertProvider : ExpertProvider;
  protected i:number=0;
  
  protected titlecasePipe:TitleCasePipe;


  constructor(expertProvider : ExpertProvider ,private capitalize:CapitalizePipe, titlecasePipe:TitleCasePipe) {
     this.titlecasePipe=titlecasePipe;
     this.expertProvider=expertProvider;
      
  } 
 

  
  async ngOnInit(){
    let path=window.location.pathname;
    path=path.substring(1,window.location.pathname.length);

    if (window.location.href.indexOf(path) > -1) {
      document.documentElement.style.setProperty('--body-size', '120rem');
      this.breadcrump.push(path);
    }
    const observer:any = {
      next: (value:any) => {this.experts=value;console.log(this.experts)},
      error : (err:any) => console.error(err),  
    
     };

   new ExpertProvider().getExperts().subscribe(observer);    
      
   
  }
  
  
 
  
}

