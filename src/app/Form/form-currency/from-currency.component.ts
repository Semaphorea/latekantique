import { CUSTOM_ELEMENTS_SCHEMA, Component , Input,Inject,OnInit, DoCheck, Injectable, InjectionToken, Injector, forwardRef} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CurrencyService } from '../../Services/currencyService';
import { Currency } from '../../Entites/Enum/currencyEnum';
// import { SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-currency',
  standalone:true,
  templateUrl: './form-currency.component.html',
  styleUrls: ['./form-currency.component.scss'],
  imports: [CommonModule,FormsModule],
   providers:[CurrencyService],    
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})    
@Injectable({providedIn:'root'})
export class CurrencyComponent {
  
  @Input() currency:string;
  
  protected currencylist:any;

constructor(private currencyService:CurrencyService){      
 this.currency='EUR';
 this.currencylist = [ { id:3,text: Currency.EUR},{id:1,text: Currency.AUD},{ id:2,text:Currency.CNY},{ id:4,text: Currency.GBP},{ id:5,text: Currency.ILS},{ id:6,text: Currency.JPY},{ id:7,text: Currency.KRW}, { id:8,text: Currency.NOK},{ id:9,text: Currency.USD}];

//console.log(this.currencylist);
this.currencyService= currencyService;   
  
   
}
  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('form-currency.component.ts L36 : ',changes); 
  // }
  


NgOnInit(){


}
/**
 * Function exchange   
 * @param price : number
 * @param devise : string['basecurrency','currency']
 * @returns price converti : number
 */
exchange(price:number,devise:string[]):Promise<number>{ 
      return this.currencyService.exchange(price,devise);       
}

a=0;
NgOnCheck(){  
    if(this.a<5){
        console.log('form-currency.component l58, currency : ',this.currency);
        this.a=this.a++;   
    }
  
}


}
