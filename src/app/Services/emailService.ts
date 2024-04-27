import { Injectable, InjectionToken,NgModule } from "@angular/core";
import { Email } from "../Entites/Entite/Email";


export const EMAILSERVICE_TOKEN = new InjectionToken<Email>('EMAILSERVICE_TOKEN');  

  
@NgModule({
    
})
@Injectable({
    providedIn: 'root'
  }) 
export class EmailService{ 
    
    email!:Email;
    constructor(){      }
  

/**
 * Function send 
 * send the message and get a callback with an error or details of the message that was sent
 * @param email 
 * @returns Promise <Response>  
 */
async send(email:Email):Promise<any>{

    const myInit: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Content-Encoding': 'gzip',
          'Access-Control-Allow-Origin': '*',
        },
  
        mode: 'cors',
        cache: 'default',
        body: JSON.stringify(email)
      };
  
  
      return fetch('api/sendemail', myInit).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
        .then(data => {
          // Handle the successful response data
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error('Fetch request failed', error);
        });
  
  

    }




}