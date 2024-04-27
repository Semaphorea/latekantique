import { Photo } from "./Photo";

export class Estimation {


     private _id!: number | null;    
     private _email!: string | null; 
     private _articleName!: string | null; 
     private _features!: string | null; 
     private _defaults!: string | null;
     private _signature!: string | null; 
     private _author!: string | null;    
     private _creationYear!: Date | null;   
     private _firstCommercializationYear!: Date | null;  
     private _photos!: Photo[] | null;  //6 photos  
     private _estimatedPrice!: number | null;  
     private _assessment!: string | null;    
   
    constructor(

         id: number | null ,
         email : string |null,
         articleName : string |null,
         features : string  | null ,
         defaults : string | null ,
         signature : string  | null  ,
         author : string | null ,  
         creationYear : Date | null ,
         firstCommercializationYear : Date | null ,
         photos : Photo[] | null ,  //6 photos
         estimatedPrice : number | null ,
         assessment : string | null    
 
        ) {
            this._id!= id;   
            this._email!= email;
            this._articleName!= articleName;
            this._features!= features;
            this._defaults!=defaults;
            this._signature!= signature;
            this._author!=author;    
            this._creationYear!= creationYear; 
            this._firstCommercializationYear!=firstCommercializationYear;  
            this._photos!=photos;
            this._estimatedPrice!=estimatedPrice;  
            this._assessment!=assessment;
                
    }


    toJson(){
      return '{"id":"'+this.id+'",'+
            '"email":"'+this.email+'",'+
            '"articleName":"'+this.articleName+'",'+
            '"features":"'+this.features+'",'+
            '"defaults":"'+this.defaults+'",'+
            '"signature":"'+this.signature+'",'+
            '"author":"'+this.author+'",'+
            '"creationYear":"'+this.creationYear+'",'+
            '"firstCommercializationYear":"'+this.firstCommercializationYear+'",'+
            '"photos":"'+this.photos+'",'+
            '"estimatedPrice":"'+this.estimatedPrice+'",'+
            '"assessment":"'+this.assessment+'"}';   

    }

    public get assessment(): string | null {
        return this._assessment;
    }
    public set assessment(value: string | null) {
        this._assessment = value;
    }

 public get estimatedPrice(): number | null {
        return this._estimatedPrice;
    }
    public set estimatedPrice(value: number | null) {
        this._estimatedPrice = value;
    }
 public get photos(): Photo[] | null {
        return this._photos;
    }
    public set photos(value: Photo[] | null) {
        this._photos = value;
    }
 public get firstCommercializationYear(): Date | null {
        return this._firstCommercializationYear;
    }
    public set firstCommercializationYear(value: Date | null) {
        this._firstCommercializationYear = value;
    }
 public get creationYear(): Date | null {
        return this._creationYear;
    }
    public set creationYear(value: Date | null) {
        this._creationYear = value;
    }
 public get author(): string | null {
        return this._author;
    }
    public set author(value: string | null) {
        this._author = value;
    }
 public get signature(): string | null {
        return this._signature;
    }
    public set signature(value: string | null) {
        this._signature = value;
    }
  public get defaults(): string | null {
        return this._defaults;
    }
    public set defaults(value: string | null) {
        this._defaults = value;
    }

    public get features(): string | null {
        return this._features;
    }
    public set features(value: string | null) {
        this._features = value;
    }
    public get articleName(): string | null {
        return this._articleName;
    }
    public set articleName(value: string | null) {
        this._articleName = value;
    }
    public get email(): string | null {
        return this._email;
    }
    public set email(value: string | null) {
        this._email = value;
    }
    public get id(): number | null {
        return this._id;
    }
    public set id(value: number | null) { 
        this._id = value;
    }

}