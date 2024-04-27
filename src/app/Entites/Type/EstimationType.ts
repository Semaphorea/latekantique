import {PhotoType} from "../Type/PhotoType"; 

export type EstimationType = {
    
     id: number | null ,
     client : string |null,
     articleName : string |null,
     features : string  | null ,
     defaults : string | null , 
     signature : string  | null  ,
     author : string | null ,  
     creationYear : Date | null , 
     firstCommercializationYear : Date | null ,
     photos : PhotoType[] | null ,  //6 photos
     estimatedPrice : string | null ,  
     assessment : string | null    



}