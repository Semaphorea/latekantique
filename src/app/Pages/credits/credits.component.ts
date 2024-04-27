import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss'],
  standalone:true,  

})
export class CreditsComponent {
  ngOnInit(){    
    let path=window.location.pathname;
    path=path.substring(1,window.location.pathname.length);          
    if (window.location.href.indexOf(path) > -1) {
      
      document.documentElement.style.setProperty('--body-size', '80rem');  
    }
  }
}
 