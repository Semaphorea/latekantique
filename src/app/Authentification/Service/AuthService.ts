import { Injectable, InjectionToken, Injector } from "@angular/core";
import { HttpClient, HttpHeaders, HttpXhrBackend } from "@angular/common/http";
import { User } from "../Entity/User";
import { Observable, Observer, firstValueFrom, from } from "rxjs";
import { shareReplay, tap } from 'rxjs/operators';  
import * as  jwt from 'jsonwebtoken';
import  moment from "moment"; 


export const AUTHSERVICE_TOKEN= new InjectionToken<AuthService>('AuthserviceToken');  


export function AuthServiceFactory(http: HttpClient) {
    return new AuthService(http);
  }




@Injectable({providedIn:'root'})
export class AuthService {
     
    constructor(private http: HttpClient) {

        
  const injector = Injector.create({providers: [ HttpClient]});
  const httpHandler = new HttpXhrBackend({ build: () => new XMLHttpRequest() });
  this.http = new HttpClient(httpHandler);
    
   }
    
     
    
    /**
     * Function authenticate
     * @param identifiant ou email
     * @param password   
     * @returns 
     */
    authenticate(identifiant:string, password:string ):Observable<JSON> {
        return this.http.post<JSON>('/api/authenticate', {identifiant, password})
            // we still need to handle the reception of the token
            .pipe(   tap(res => this.setSession) ,    //Pipe not used in Angular Documentation  13/10/2023 
                shareReplay()
              );
    }

    /**
     * Function authResult
     * @param authResult 
     */
    private setSession(authResult:any) {
        
        const expiresAt =moment().add(authResult.expiresIn,'second');

        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }          
    /**
     * Function logout
     */
    logout() {
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
    }
    
    /**
     * Function isLoggedIn
     * @returns boolean
     */
    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }
    
    /**
     * Function isLoggedOut
     * @returns boolean
     */
    isLoggedOut() {
        return !this.isLoggedIn();
    }

    /**
     * Function getExpiration
     * @returns moment.Moment
     */
    getExpiration() :moment.Moment{
        const expiresAt:any=undefined;
        const expiration = localStorage.getItem("expires_at");
        if(expiration !=null){
              const expiresAt = JSON.parse(expiration); 
    }
        return moment(expiresAt);
    }    


    /** 
     * Function getAuthenticatedUser
     * @param id :number
     * @returns User
     */
    getAuthenticatedUser(id:number):Observable<User>{

        let resobs : any[]=[];
        let user: User;
        let obs:Observable<User>=  this.sendData("users/"+id,"GET");

        return obs;
    }
     
    /**
     * Function getUserIdFromToken
     * @returns number|undefined
     */
    getUserIdFromToken() :number|undefined{  
        let userId:number|undefined=undefined ;
        let token = localStorage.getItem("id_token");
        if(token!=null ){
            const decoded = jwt.decode(token);
            if(decoded!=null){
               let  userIdstr =decoded.sub;
                if(userIdstr !=undefined)
                   userId = typeof userIdstr === 'function' ? parseInt(userIdstr()) : parseInt(userIdstr);                
                }
        }
              
        return userId;
      }  

    /**
     * sendData 
     * @param callApi 
     * @param method 
     * @param data 
     * @returns Observable<any>
     */ 
   sendData(callApi:string,method:string,data?:any):Observable<any>{
    let ret:any;  
    if(this.http){     
       const headers = new HttpHeaders({ 
                                         'Access-Control-Allow-Origin': '*', 
                                         'Content-Type': 'application/json', 
                                         'Access-Control-Allow-Methods':method,
                                         'Access-Control-Allow-Headers':'Content-Type'
                                         });    

       data? (data:any)=>{console.log('authService L133 : api/'+callApi+"/"+data)}:null;  

        method=='GET'? ret=from(this.http.get('api/'+callApi,{headers})) : ret=from(this.http.post('api/'+callApi,data,{headers:headers})); 
            
       console.log("authService, sendData L137 : ",ret);  
    } else {  
      ret=new Observable<any>();
    }      
    
    return ret;
 }

}