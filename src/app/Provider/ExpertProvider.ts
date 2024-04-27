import { Injectable, InjectionToken } from '@angular/core';
import { Expert } from '../Entites/Entite/Expert';
import { Photo } from '../Entites/Entite/Photo';
import { Observable,from } from 'rxjs';
export const EXPERT_TOKEN = new InjectionToken<Expert>('ExpertToken');  
import { environnment } from '../Configuration/Environnement/environnement';
@Injectable({
  providedIn: 'root', // or specify a specific module where this provider should be available
})


export class ExpertProvider {
  
    public experts: Expert[]=[]; 


  constructor() { 
   this.getExperts(); // Call the method to fetch experts when the provider is instantiated
  
  
  }


  async fetchExperts(): Promise<Expert[]> {
    const apiURL = environnment.backendAPI;
    const data = 'experts';
  
    try {
      const myInit: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Content-Encoding': 'gzip',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors', 
        cache: 'default',   
      };  
  
//      console.log(apiURL  + data);  
      const response = await fetch('api/'+data, myInit);
      const responseData = await this.parseResponse(response);
      
      const expertsData = Array.isArray(responseData) ? responseData : [responseData];
  
      const experts: Expert[] = expertsData[0].experts.map((element: Expert) => (
        new Expert(
          element.id,
          element.firstname,
          element.lastname,
          element.id_address,
          element.diplomes,
          element.experiences,
          element.emailAddress,
          element.phoneNumber,
          new Photo(
            element.photo?.id ?? null,
            element.photo?.title ?? null,
            element.photo?.date ?? null,
            element.photo?.description ?? null,
            element.photo?.photo_url ?? null,
            element.photo?.photo_directory ?? null,
      
          )
        )
      ));
  
      this.experts.push(...experts);
      setTimeout(() => {
        console.log( this.experts);
        
      },3000);
      return experts;
    } catch (error:any) {
      console.error('Fetch or JSON parsing error:', error.message);
      throw error;
    }
  }
  





  private async parseResponse(response: Response): Promise<any> {
    if (!response.ok) {
      throw new Error('Error: Fetch request failed with status ' + response.status);
    }
    return await response.json();
  }
  



  getExperts():Observable<Expert[]>{    
    let res=from<Promise<Expert[]>>(this.fetchExperts());     return res;  
  
  }
}
