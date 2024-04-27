import { Component,Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Pages/Structure/header/header.component';
import { FooterComponent } from './Pages/Structure/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from './Entites/Entite/Article';
import { HTTP_INTERCEPTORS, HttpHandler, HttpRequest } from "@angular/common/http";

import { CommandeControllerService } from './Services/ControllerService/CommandeControllerService'; 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports : [CommonModule,HeaderComponent,FooterComponent,RouterOutlet], 
  styleUrls: ['./app.component.scss'],
 
  standalone:true,  
})
export class AppComponent {
  title = 'laTekAntique';

  constructor(){
    console.log("app.component L23","Création de CommandeControllerService");  
   let commandeControllerService= new CommandeControllerService();  
   console.log(commandeControllerService);
   console.log("app.component L26, constructor : commandeControllerService Init UID", commandeControllerService.uid);
  }
  
    
   
}
