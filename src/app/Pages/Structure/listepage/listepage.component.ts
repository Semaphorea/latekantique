import { Component } from '@angular/core';
import {RouterLink} from '@angular/router'

@Component({
  styleUrls: ['./listepage.component.scss'],    
  standalone:true,
  
  selector: 'app-nav',
  imports:[RouterLink],
  template: `
  
  <nav class="nav navbar  navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
    
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span> 
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
  
       
           <li> <a  class="nav-link" routerLink='/accueil' alt="accueil" >Accueil</a></li>       
           <li> <a  class="nav-link" routerLink='/estimation' alt="estimation" >Estimation</a></li>       
           <li> <a  class="nav-link" routerLink='/salle-des-ventes' alt="salle-des-ventes" >Salle des Ventes</a></li>       
           <li> <a  class="nav-link" routerLink='/evénements' alt="evénements" >Evénements</a></li>       
           <li> <a  class="nav-link" routerLink='/contact' alt="contact" >Contact</a></li>       
                                      
        </ul>
        
      </div>
    </div>
  </nav>
 
           `,  
          

})
export class NavComponent {

}
