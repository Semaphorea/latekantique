import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, of } from 'rxjs';



@Component({
  selector: 'app-paiementconfirmation',
  templateUrl: './paiementconfirmation.component.html',
  styleUrls: ['./paiementconfirmation.component.scss']
})
export class PaiementconfirmationComponent {

  
  activatedRoute:ActivatedRoute;
  commandevalidee:boolean=false;
  paimentStatus!:string;
  session_id!:string;

  constructor(){

    this. activatedRoute= inject(ActivatedRoute);   
    console.log(this.activatedRoute);
    this.fetchParameters();
    this.deleteSessionStorage();  
 
  }
  

  /**
   * function fetchParameters
   * Attribute values to paimentStatus and session_id fetch from URL  
   * Return Void
   */
  fetchParameters(){
    

    //Return non pas un Observable mais un tableau d'object ???
    let params:Observable<object[]>=  this.activatedRoute.params.pipe(
      (value:any)=>{
            let parameters=value._value['paimentStatus&:session_id'].split('&');   
           return parameters.map( (values:any)=>{
              let res:string[]=values.split('=');                
              let ret:Object;
              ret= {key:res[0],value:res[1]};
              return ret;}   );  
            
           }
     );
           
  params.forEach((element:any) => {
   console.log(element.value);
      if(element.key=='paimentStatus'){this.paimentStatus=element.value; }
      else if(element.key=='session_id'){this.session_id =element.value;}    
  });    
  

  }



  deleteSessionStorage(){       
    sessionStorage.clear();  
  }




}


