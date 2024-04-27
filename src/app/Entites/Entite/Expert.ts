import { PersonneType } from "../Type/Personne";
import { ExpertType } from "../Type/ExpertType";    
import { Address } from './Address' ;   
import { Photo } from './Photo' ;


export class Expert implements PersonneType,ExpertType{
    id : number ; 
    firstname : string ;
    lastname:string ;  
    id_address:number ;
    diplomes : string[];
    experiences : string[] ; 
    emailAddress : string ;
    phoneNumber : string ;
    photo: Photo | null ;
    
   constructor( 
                id : number , 
                firstname : string ,
                lastname:string ,
                id_address:number ,  
                diplomes:string[],
                experiences:string[],
                emailAddress: string,
                phoneNumber : string ,
                photo : Photo |null
){ 
    this.id = id ; 
    this.firstname = firstname ;
    this.lastname = lastname ;
    this.id_address= id_address ;
    this.diplomes = diplomes;
    this.experiences= experiences ; 
    this.emailAddress = emailAddress ;
    this.phoneNumber = phoneNumber ;
    this.photo = photo ;   
      
   } 


   getId(){return this.id;}
   getLastName(){return this.lastname;}
   getFirstName(){return this.firstname;}
   getAddress(){return this.id_address;}
   getEmailAddress(){return this.emailAddress;}
   getDiplomes(){return this.diplomes;}
   getExperiences(){return this.experiences;}  
   getPhoto(){return this.photo;}


   clone():Expert{  
    return new Expert(
        this.id,
        this.lastname,
        this.firstname,
        this.id_address,
        [...this.diplomes], 
        [...this.experiences], 
        this.emailAddress,
        this.phoneNumber,
        this.photo ? this.photo.clone() : null 
      );
    }
}