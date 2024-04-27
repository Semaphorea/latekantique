
import { Injectable, Injector, StaticProvider } from '@angular/core';
// import { ForexExchangeRate, Currencies, ForexExchangeResponse } from 'forex-rates';
import { ApiService } from './apiService';


@Injectable({ providedIn: 'root' })
export class CurrencyService {


    // forexExchangeRate: ForexExchangeRate;
    public apiService: ApiService;
    public rates!: number;
    constructor() {

        // this.forexExchangeRate = new ForexExchangeRate();

        const providers: StaticProvider[] = [
            { provide: ApiService, useClass: ApiService }]
        const injector = Injector.create({ providers });
        this.apiService = injector.get(ApiService);


    }
   /**
    * Function getRateFromEuro
    * @param currency:string[] : devises  
    * @param currency_base : string
    * @returns Les Taux de conversion en fonction de l'EURO
    * 8/12/2023 -> nombre de requêtes consommées supérieur au plan  
    */
    //    async getRateForexApi(currency: string[]):Promise<JSON> {
    //     let res:Promise<JSON>;
    //     let ret:JSON;
    //     let currency_base=currency[0];
    //     const api_key_forexrateapi = "5a9b02eaaa7dbef17877d4511f7956b8";  
    //     let request = 'https://api.forexrateapi.com/v1/latest?api_key=' + api_key_forexrateapi + '&base=' + currency_base + '&currencies=' + currency.splice(1,currency.length-1).join(',');
    //        let ob=     this.apiService.sendDataExtern(request,"POST");

    //          ob.subscribe({next:(value:any)=>{console.log(value);},
    //                       error:(error:Error)=>{console.error(error)},
    //                     complete:()=>{console.log("Observable complete !")}})
    //     ret= await fetch(request,{method:"POST"}).then((value:Response)=>{console.log("currencyService: response body",value.body);console.log("currencyService: response json",value.json());return value.json()}); //firstValueFrom(this.apiService.sendData(request,"POST"));    
    //     this.rates= ret; 
    //     console.log("currencyService.ts L37 : rates",this.rates);  
    //     //Exemple retour {"success":true,"base":"USD","timestamp":1701968389,"rates":{"EUR":0.92657,"INR":83.347703,"JPY":144.146975}}  
    //      return this.rates;
    // }

    /**
     * Function getRate
     * @param currency : string ['basecurrency','currency']
     * @returns Promise <number>
     */
      async getRate(currency: string[]):Promise<number> {
        let adressAPI='https://api.freecurrencyapi.com/v1/latest?apikey=' ;  
        const api_key = "fca_live_941lkXzZA4NFABrc8VlvQ8YU6OXlGZRxsSPYLcS3";

          let currency_base=currency[0]; 
                 //&base_currency=EUR&currencies=USD,EUR,JPY
                   
              
                   let request = adressAPI + api_key + '&base_currency=' + currency_base + '&currencies=' + currency.slice(1,currency.length).join(','); 
                  //     let ob=     this.apiService.sendDataExtern(request,"GET");

                    let response= await fetch(request,{method:"GET"}).then((response:any)=>{return response.json()}).then((data:any)=>{console.log("currencyService L63, change :",data);  
                    return data;});
                    this.rates =  await response.data[currency[1]];   
      
        console.log("currencyService.ts L37 : rates",this.rates);  
        //Exemple retour {"success":true,"base":"USD","timestamp":1701968389,"rates":{"EUR":0.92657,"INR":83.347703,"JPY":144.146975}}  
         return this.rates;
    }


    /**
     * Function exchange
     * @param price 
     * @param currencies []
     * @returns 
     */
    async exchange(price:number,currencies: string[]):Promise<number>{
      let res:number;
     
       let taux:number=await this.getRate(currencies).then((value:any)=>{return value;});   
      
     
      console.log("currencyService.ts L82 : taux : ",taux);
      let ra:number=Number.parseFloat(JSON.stringify(taux));      
       res=   (Math.round (price*ra*100))/100;   
      return res;    
    }
   

    // /**
    //  * Function exEuroTo 
    //  * @param price   
    //  * @param currency 
    //  * @returns number Prix converti dans la monnaie indiquée en paramètre
    //  */
    // async exEuroTo(price: number, currency: string[]): Promise<number> {
    //     this.forexExchangeRate.setBaseCurrency(Currencies.EUR);
    //     const date = new Date();
    //     const currencies: Currencies[] = [];
    //     currency.forEach((element: string) => {
    //         currencies.push(Currencies[element as keyof typeof Currencies]);
    //     });
    //     return this.forexExchangeRate.setDate(date)
    //         .setCurrencies(currencies)
    //         .getRates()
    //         .then((response: ForexExchangeResponse) => {
    //             let res!: number;
    //             let rate = response.rates['name'].toPrecision;
    //             if (typeof rate === 'number') { res = rate * price; }
    //             if (typeof rate === 'string') { res = Number.parseInt(rate) }
    //             return res;
    //         });
    // }


}

