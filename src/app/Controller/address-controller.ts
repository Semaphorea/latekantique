import { firstValueFrom } from "rxjs";
import {Address} from "../Entites/Entite/Address";
import { ApiService } from "../Services/apiService";
import { Injector, StaticProvider } from "@angular/core";



export class AddressController{


   public apiService:ApiService;

   private _address?: Address;

   constructor(...args:any) {  
 
     const providers: StaticProvider[] = [
       { provide: ApiService, useClass: ApiService }]
        const injector = Injector.create({ providers });
        this.apiService = injector.get(ApiService);  
        
        let nb=args.length;
        
        switch(nb){
            case 0: ()=>{};break;
            case 1 : (address:Address)=>{  this._address=address;};break;
        }  
       


   }

   async getLastId():Promise<number>{
    let id!: number;
    
      let lastAddId$ = this.apiService?.sendData('/address/last-id', 'GET');

      if (lastAddId$ != undefined) {
        id=JSON.parse(JSON.stringify(await  firstValueFrom(lastAddId$)))['id'];  
        console.log("address-controller getLastId L39",id);
       // return await firstValueFrom(lastAddId$);
      } else {
        console.error('address-controller getLastId L432', "obs undefined");

      }
    
    return id;
    
    }

    
 
   async newAddressId():Promise<number>{let res = await this.getLastId();return res+1;}

   

   public get address(): Address | undefined {
    return this._address;
    }
    public set address(value: Address | undefined) {
       this._address = value;
    }


}