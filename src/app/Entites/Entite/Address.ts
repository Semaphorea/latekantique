import { AddressType } from '../Type/AddressType'
export class Address implements AddressType{
  
   
  
    private _id: number=0;
    private _id_personne: number=0;
    private _streetNumber: number=0;
    private _typeOfRoad: string=""; 
    private _address: string="";  
    private _complementAddress: string ="";
    private _postCode: string="";
    private _city: string="" ;  
    private _country: string="" ; 


    constructor( ...args:any[]
  
    ){


        let nb= args.length;


        switch(nb){

            case 0:()=>{};break;
            case 9:(  _id: number,
                 _id_personne: number,
                 _streetNumber: number,
                 _typeOfRoad: string, 
                 _address: string,  
                 _complementAddress: string ,
                 _postCode: string,
                 _city: string , 
                 _country: string )=>{
                    this.id=_id,
                    this._id_personne=_id_personne;
                    this.streetNumber=_streetNumber ;
                    this.typeOfRoad=_typeOfRoad ;
                    this.address= _address ;
                    this.complementAddress = _complementAddress ;
                    this.postCode = _postCode ;
                    this.city = _city ;
                    this.country = _country ;
                 };break;}}
    

    public toString():string{  
         let res :string='';
        if (this.streetNumber!=null ) { res =  this.streetNumber.toString() ;} 
        if (this.typeOfRoad!=null ) { res =  this.typeOfRoad.toString() ;} 
        if (this.address!=null ) { res =  this.address;} 
        if (this.complementAddress!=null ) { res =  this.complementAddress;} 
        if (this.postCode!=null ) { res =  this.postCode;} 
        if (this.city!=null ) { res =  this.city ;} 
        if (this.country!=null ) { res =  this.country ;} 
        
        return  res ;}  

        toJson(){
            return '{"id":'+this.id+';'+
                  '"id_personne":"'+this.id_personne+'";'+ 
                  '"streetNumber":"'+this.streetNumber+'";'+ 
                  '"typeOfRoad":"'+this.typeOfRoad+'";'+ 
                  '"address":"'+this.address+'";'+
                  '"complementAddress":"'+this.complementAddress+'";'+
                  '"postCode":"'+this.postCode+'";'+
                  '"city":"'+this.city+'";'+
                  '"country":"'+this.country+'"}';   
      
          }
          
        public get id_personne(): number {
            return this._id_personne;
        }
        public set id_personne(value: number) {
            this._id_personne = value;
        }
        public get country(): string {
            return this._country;
        }
        public set country(value: string) {
            this._country = value;
        }
        public get city(): string {
            return this._city;
        }
        public set city(value: string) {
            this._city = value;
        }
        public get postCode(): string {
            return this._postCode;
        }
        public set postCode(value: string) {
            this._postCode = value;
        }
        public get complementAddress(): string {
            return this._complementAddress;
        }
        public set complementAddress(value: string) {
            this._complementAddress = value;
        }
        public get address(): string {
            return this._address;
        }
        public set address(value: string) {
            this._address = value;
        }
        public get typeOfRoad(): string {
            return this._typeOfRoad;
        }
        public set typeOfRoad(value: string) {
            this._typeOfRoad = value;
        }
        public get streetNumber(): number {
            return this._streetNumber;
        }
        public set streetNumber(value: number) {
            this._streetNumber = value;
        }
        public get id(): number {
            return this._id;
        }
        public set id(value: number) {
            this._id = value;
        }
       
    }
