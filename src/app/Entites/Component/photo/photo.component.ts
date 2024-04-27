import { Component, Inject,Injectable } from '@angular/core';
import { Photo } from '../../Entite/Photo';

 
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})

@Injectable()
export class PhotoComponent {

   public photo:Photo ;   
   public classe :string|null;
   public constructor( photo:Photo){this.photo= photo ; this.classe='coucou'; }    
    
}
   