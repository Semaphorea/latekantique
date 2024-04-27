import { Component , OnInit} from '@angular/core';

import { NavComponent }from '../Structure/listepage/listepage.component';    
  
@Component({
  selector: 'app-accueil',
  standalone:true,   
  imports : [NavComponent] ,     
  styleUrls: ['./accueil.component.scss'],    
  templateUrl:'./accueil.component.html',   
 
})  
export class AccueilComponent {  
  
  
  ngOnInit(){    
    let path=window.location.pathname;
        path=path.substring(1,window.location.pathname.length);          
    if (window.location.href.indexOf(path) > -1) {
      // console.log(window);
      // console.log(global);
      // console.log(globalThis);
      document.documentElement.style.setProperty('--body-size', '110rem');  
    }
  }

  }

 