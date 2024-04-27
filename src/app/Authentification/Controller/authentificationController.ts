import { NgModule,Inject , Output,Input} from '@angular/core';
import { AuthService, AUTHSERVICE_TOKEN,AuthServiceFactory } from '../Service/AuthService';
import * as jwt from 'jsonwebtoken';
import { User } from '../Entity/User';  
import { Observable, first, takeLast , firstValueFrom} from 'rxjs';


@NgModule({
   declarations:[],
   providers:[{provide :AUTHSERVICE_TOKEN,useFactory:AuthServiceFactory}]
 
  })


export class AuthentificationController{

   private _authentification: boolean;  
   private _authService: AuthService;  
   private _user!: User; 



    constructor(authService: AuthService){  
        this._authentification=false;  
        this._authService=authService;
    }  



    /**
     * Function authenticate
     * @param identifiant 
     * @param password 
     * @returns boolean    
     */
    public async authenticate(identifiant:string,password:string):Promise<boolean>{
     
      let obs=this.authService.authenticate(identifiant, password); 
              firstValueFrom(obs)
        let tokenJSON:any;

      let res= firstValueFrom(obs).then(
                               async (value)=>{
                                   tokenJSON = value;                                                                
                                   sessionStorage.setItem("token",tokenJSON.idToken);
                            
                                        let usertemp= await this.getUserFromTokenToPromise();
                                         if(usertemp!=null){ this.user=usertemp as User;
 //                                                           console.log("authentificationController L49" , this.user );                                                           
                                                             return true;   }
                                         else{return false;}                                                                   
            });          
       return this.authentification=await res;
     }
  
  
 


    /**
     * Function getUserIdFromToken
     * @returns userId : number|undefined
     * TOCHECKED 24/11/2023
     */
    getUserIdFromToken() :number|undefined{  
        let userId:number|undefined=undefined ;
        let token = sessionStorage.getItem("token");

       // console.log('authentificationController L74, Token',token);
        if(token!=null ){
          const decoded = jwt.decode(token);  
          if(decoded!=null){
            let  userIdstr =decoded.sub;   // sub (=subject) en jwt identifie l'utilisateur <=> email
            console.log('authentificationController L93, userIdstr',userIdstr);
                if(userIdstr !=undefined)
                   userId = typeof userIdstr === 'function' ? parseInt(userIdstr()) : parseInt(userIdstr);                
                }
        }
              
        return userId;
      }



      /**
       * Function getUserFromToken
       * @returns User|undefined
       */
      getUserFromToken():User|undefined{
        let user:User|undefined=undefined;
        let id= this.getUserIdFromToken();
        let user$: Observable<User>;
        console.log("authentificationController L105 : ", id);  


        if(id!=undefined){
        user$=this.authService.getAuthenticatedUser(id);    

      
        user$.subscribe({next:(value:any)=>{user=value;},
                         error:(error:Error)=>{console.error("authentificationController L110 : ", error)},
                         complete:()=>{console.log("authentificationController L111 : "," observer complete" )}})
        }  
      
        if(user!=undefined) this.user=user;
        return user;
      }
  
       /**
       * Function getUserFromTokenToPromise
       * @returns User|undefined
       */
       getUserFromTokenToPromise():Promise<User>{
        let user!:Promise<User>;
        let id= this.getUserIdFromToken();
        let user$: Observable<User>;
      
        if(id!=undefined){
          user$=this.authService.getAuthenticatedUser(id);    
          user= firstValueFrom(user$);
        }
        return user;  
       
      }

      
    public get authentification(): boolean {
        return this._authentification;
    }
    public set authentification(value: boolean) {
        this._authentification = value;
    }
    public get authService(): AuthService {
      return this._authService;
    }
    public set authService(value: AuthService) {
      this._authService = value;
    }
    public get user(): User {
      return this._user;
    }
    public set user(value: User) {
      this._user = value;
    }
 
}

function from(user$: Observable<User>) {
  throw new Error('Function not implemented.');
}
