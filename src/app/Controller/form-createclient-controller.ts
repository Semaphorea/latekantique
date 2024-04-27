import { Client } from '../Entites/Entite/Client' ;
import { User } from '../Authentification/Entity/User' ;
import { Inject, NgModule } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import {firstValueFrom, from} from 'rxjs';
import { ApiService } from '../Services/apiService'; 
import { Address } from '../Entites/Entite/Address';
import { AddressController } from './address-controller';



export class FormCreateClientController{
    private _client: Client|undefined;  
    private _user: User | undefined;
    private addressController:AddressController;
    private addressBillingController:AddressController;
  


    constructor(@Inject(ApiService) private apiService: ApiService ,){
        this._client=undefined;
        this.addressController=new AddressController();
        this.addressBillingController=new AddressController();
    }

    public async setValues(f: NgForm ){
        let value:any=f.value;  
        let id_address:any;
        let id_addressbilling:any=null;
        if(value!=null) {

          console.log("form-createclient-controller L31 : ", value);    
          let idClient=await this.newClientId();
          
          let id_address:number= await firstValueFrom(from(this.addressController.newAddressId()));
          console.log("form-createclient-controller L35 : ",id_address); 
          this.addressController.address= new Address(id_address, idClient,value.streetNumber,value.typeOfRoad,value.address,value.complementAddress,value.postcode,value.city,value.country);  
          console.log("form-createclient-controller L37 : ",  this.addressController);    
          
          if(value.addressbilling != null){ 
            this.addressBillingController.address=new Address(await this.addressBillingController.newAddressId(), idClient,value.streetNumberbilling,value.typeOfRoadbilling,value.addressbilling,value.complementAddressbilling,value.postcodebilling,value.citybilling,value.countrybilling);
            console.log("form-createclient-controller L41 : ",  this.addressBillingController);    
              
            }
           
            if(this.addressBillingController.address!=null){id_addressbilling=this.addressBillingController.address.id;}
             if(this.addressController.address!=null){id_address=this.addressController.address.id!;}
         
           this.client=new Client(
          idClient,
          value.lastname,
          value.firstname,
            value.genre,
            id_address, 
            id_addressbilling,
          value.email,
          value.phonenumber  
       );

        this.user=new User(await this.newUserId(),    
          idClient,value.email,value.password
        );
        



        console.log("from-createclient-controller L64 :",this.client);
        console.log("from-createclient-controller L65 :",this.user);
           
     this.persist();
    }
  
    }  




   /**
    * Function getClientLastId
    * @returns Promise<number | undefined>
    */
   public async getClientLastId(): Promise<number | undefined> {

    let id:number|undefined=undefined;  
    let obs= this.apiService?.sendData('/clients/last-id','GET'); 
 
    if(obs!=undefined){
         id=JSON.parse(JSON.stringify(await  firstValueFrom(obs)))['id'];    
         console.log("form-createclient-controller getClientLastId( : ",id);  
    }else{console.error('form-createclient-controller.ts L140 getClientLastId(: ', "obs undefined")}
    return id;
   }
   
   /**
    * Function newClientId
    * @returns id Promise<number>
    */
   public async newClientId():Promise<number>{

       return  this.getClientLastId()
         .then((lastId:any)=>{return lastId+1;})
         .catch((error:Error)=>{console.error('form-creatclient-controller.ts, newClientId L48', 'Last client id was not fetched !')});
     

   }
  
   
   /**
    * Function getUserLastId
    * @returns Promise<number | undefined>
    */
   public async getUserLastId(): Promise<number | undefined> {

    let id:number|undefined=undefined;  
    let obs= this.apiService?.sendData('users/last-id','GET'); 
 
    if(obs!=undefined){
         id=JSON.parse(JSON.stringify(await  firstValueFrom(obs)))['id'];    
         console.log("form-creatclient-controller.ts getUserLastId : ",id);  
    }else{console.error('form-creatclient-controller.ts L96 getUserLastId : ', "obs undefined")}
    return id;
   }
   
   /**
    * Function newUserId
    * @returns id Promise<number>
    */
   public async newUserId():Promise<number>{

       return  this.getUserLastId()
         .then((lastId:any)=>{return lastId+1;})
         .catch((error:Error)=>{console.error('form-createclient-controller.ts, newUserId L100', 'Last user id was not fetched !')});
     
   }



   /**
    * Function persist
    */
   private persist(){
       
      let clientob$= this.apiService?.sendData('clients/create','POST',this.client?.toJson());  
          clientob$.subscribe({next:(value:any)=>{console.log(value)},
                               error:(error:Error)=>{console.error('form-createclient-controller L146 : ', error)},
                               complete:()=>{console.log('form-createclient-controller L147 : ',"observable complete")}}); 

        let addressuser=this.addressController.address?.toJson();
        console.log("form-createclient-controller L149 , address",addressuser); 
        let addressob$= this.apiService?.sendData('address/create','POST',this.addressController.address?.toJson());
        addressob$.subscribe({next:(value:any)=>{console.log(value)},
        error:(error:Error)=>{console.error('form-createclient-controller L146 : ', error)},
        complete:()=>{console.log('form-createclient-controller L147 : ',"observable complete")}}); 
        
        
        let userob$= this.apiService?.sendData('users/create','POST',this.user?.toJson());  
        userob$.subscribe({next:(value:any)=>{console.log(value)},
        error:(error:Error)=>{console.error('form-createclient-controller L146 : ', error)},
        complete:()=>{console.log('form-createclient-controller L147 : ',"observable complete")}}); 
        
        
        console.log("form-createclient-controller L162 , address Billing Controller ",this.addressBillingController.address); 
      if( this.addressBillingController.address!=null){ 
          let addressbillob$= this.apiService?.sendData('address/create','POST',this.addressBillingController.address?.toJson()); 
          addressbillob$.subscribe({next:(value:any)=>{console.log(value)},
          error:(error:Error)=>{console.error('form-createclient-controller L146 : ', error)},
          complete:()=>{console.log('form-createclient-controller L147 : ',"observable complete")}}); 
   
        }
       

   }



    protected get client(): Client|undefined {
        return this._client;
    }
    protected set client(value: Client|undefined) {
        this._client = value;
    }
    public get user(): User | undefined {
        return this._user;
    }
    public set user(value: User | undefined) {
        this._user = value;
    }
}