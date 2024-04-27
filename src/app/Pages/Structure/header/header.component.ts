import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Input, Output } from '@angular/core';
import { NavComponent } from  '../listepage/listepage.component';

@Component({
  selector: 'app-header',
  standalone:true, 
  imports:[NavComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] ,
  schemas:[CUSTOM_ELEMENTS_SCHEMA]  
})
export class HeaderComponent {



}
