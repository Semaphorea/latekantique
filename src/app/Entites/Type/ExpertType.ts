
import {PhotoType} from "../Type/PhotoType"; 

 
export type ExpertType= { 
    id : number ;  
    lastname:string ;
    firstname : string ; 
    id_address:number ;
    diplomes : string[];
    experiences : string[] ; 
    emailAddress : string ;
    phoneNumber : string ;
    photo: PhotoType | null 
}