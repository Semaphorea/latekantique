import { Injectable, InjectionToken,NgModule } from '@angular/core';
import { Evenement} from '../Entites/Entite/Evenement';
import {firstValueFrom, from} from 'rxjs';
export const EVENEMENT_TOKEN = new InjectionToken<Evenement>('EVENEMENT_TOKEN') ;



@Injectable({
  providedIn: 'root', // or specify a specific module where this provider should be available  
 
})



export class EvenementProvider { 

  public evenements : Evenement[]=[]; 

   public constructor(){
       this.fetchEvenements()
  
  }


  async fetchEvenements(): Promise<void> {
   
    let donnees = 'evenements';
    
    // Function to parse JSON response
    async function parseResponse(response: Response) {
      if (!response.ok) {
        throw new Error('Error: Fetch request failed with status ' + response.status);
      }
      return await response.json();
    }
    
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
      

      let response =  fetch('api/' + donnees,myInit);
      donnees = await parseResponse(await firstValueFrom(from(response)));  
      console.log(donnees);
      const evenementsData = Array.isArray(donnees) ? donnees : [donnees];
      console.log(evenementsData[0].evenements); 
      this.evenements.push(
        ...evenementsData[0].evenements.map((Element: any) => {
          return { 
            id: Element.id,
            title: Element.title, 
            date: [new Date(Element.date[0]),new Date(Element.date[1])],
            description: Element.description,
            photo: Element.photo_url,
       
          };
        })
      );

    
    setTimeout(() => {
      console.log( this.evenements);
      
    },3000);
      console.log('');
    } catch (error:any) {  
      console.error('Fetch or JSON parsing error:', error.message);     
    }
  }
}

  
 
 
