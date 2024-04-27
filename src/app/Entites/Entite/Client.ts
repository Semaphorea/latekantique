import { Address } from "./Address";
import { PersonneType } from "../Type/Personne";
export class Client implements PersonneType {

   
    private _id: number=0;
    private _lastname: string="";  
    private _firstname: string="";
    private _genre: string="";
    private _id_address: number=0;   //Correspond à deliveryAddress  
    private _id_billingAddress: number=0;  
    private _emailAddress: string="";
    private _phoneNumber:string="";
    
    constructor( ...args:any[] ){
     
            let nb= args.length;
         
            switch(nb){
                case 0:()=>{};break;
                case 2: ( _lastname: string,   
                          _firstname: string, _emailAddress:string)=>{this.lastname=_lastname, this.firstname=_firstname, this._emailAddress= _emailAddress};break;
                case 8:( _id: number,
                     _lastname: string,   
                     _firstname: string,
                     _genre: string,
                     _id_address: number,   //Correspond à deliveryAddress  
                     _id_billingAddress: number,  
                     _emailAddress: string,
                     _phoneNumber:string)=>{ this._id = _id,
                    this._lastname = _lastname ,
                    this._firstname = _firstname,
                    this._genre = _genre,
                    this._id_address= _id_address,  
                    this._id_billingAddress = _id_billingAddress,
                    this._emailAddress = _emailAddress,  
                    this._phoneNumber = _phoneNumber}
                     }
            
       
    }
    

    
    toJson(){
        return '{"id":'+this.id+','+
              '"lastname":"'+this.lastname+'",'+
              '"firstname":"'+this.firstname+'",'+
              '"genre":"'+this.genre+'",'+
              '"id_address":'+this.id_address+','+
              '"id_billingAddress":'+this.id_billingAddress+','+
              '"emailAddress":"'+this.emailAddress+'",'+
              '"phoneNumber":"'+this.phoneNumber +'"}';
                      
  
      }


    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get id_address(): number {
        return this._id_address;
    }
    public set id_address(value: number) {
        this._id_address = value;
    } 

    public get emailAddress(): string {
        return this._emailAddress;
    }
    public set emailAddress(value: string) {
        this._emailAddress = value;
    }

    public get id_billingAddress(): number {
        return this._id_billingAddress;
    }
    public set id_billingAddress(value:number) {
        this._id_billingAddress = value;
    }
    public get id_deliveryAddress(): number {
        return this._id_address;
    }
    public set id_deliveryAddress(value: number) {
        this._id_address = value;
    }
    public get genre(): string {
        return this._genre;
    }
    public set genre(value: string) {
        this._genre = value;
    }
    public get firstname(): string {
        return this._firstname;
    }
    public set firstname(value: string) {
        this._firstname = value;
    }
    public get lastname(): string {
        return this._lastname;
    }
    public set lastname(value: string) {
        this._lastname = value;
    }
    public get phoneNumber(): string {
        return this._phoneNumber;
    }
    public set phoneNumber(value: string) {
        this._phoneNumber = value;
    }  
}