import { Injectable, InjectionToken, Injector, StaticProvider } from '@angular/core';
import { BehaviorSubject, from, of } from 'rxjs';
import { ApiService } from '../../../../Services/apiService';
import { environnment } from '../../../../Configuration/Environnement/environnement';

export const TOKEN_PAYMENTSERVICE= new InjectionToken<PaymentService>('TOKEN_PAYMENTSERVICE');
export let PaymentFactory=()=>{return new PaymentService();} 



@Injectable({
  providedIn: 'root',
})
export class PaymentService {
 private _KEYS: string = 'sk_test_51OHDFLD5NE1kAJymV2tjTuwLg5qDp9MSfkiI7kpTP7Q8XRxWGURSsKbDvbBRbww10sQaFMVurT6L9eMQ2B1Kyw4m00JYjygWOO';


  stripe = require('@stripe/stripe-js')(this.KEYS);  
      
  createPaymentIntent(arg0: { amount: any; currency: string; }) {
  return  from(this.stripe.confirmPayment({
      Element,
      confirmParams: {
        // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
        return_url: environnment.frontendURL+"/paiment",
      },
    })
    .then(function(result:any) {
      if (result.error) {
        console.error('payment.service L21 Erreur : ',result.error );
          // Inform the customer that there was an error.
      } 
    }));
    
    
  }


  StripePublicKey(StripePublicKey: any) :string{
        this.KEYS=StripePublicKey;
    return  this.KEYS;
  }  

  apiService:ApiService;

  constructor(){
    
    const providers: StaticProvider[] = [
      { provide: ApiService, useClass: ApiService }]
    const injector = Injector.create({ providers });  
    this.apiService = injector.get(ApiService);
  }
  private paimentStatusSubject = new BehaviorSubject<string>('loading');
  public paimentStatus$ = this.paimentStatusSubject.asObservable();

  updatePaimentStatus(status: string) {
    this.paimentStatusSubject.next(status); 
  }

  checkStripePaiement(){         
    
   this. stripe.confirmBancontactPayment('{PAYMENT_INTENT_CLIENT_SECRET}', {
    payment_method: {
      billing_details: {
        name: 'Jenny Rosen',
      },
    },
    // Return URL where the customer should be redirected after the authorization.
    return_url: window.location.href,
  }) 
  .then(function(result:any) {
    if (result.error) {
      // Inform the customer that there was an error.
    }
  });

    
    this.paimentStatus$ = this.apiService.sendData('webhook', 'POST'); 
  }

//     // Inside your Angular service
// handlePaymentSuccessEvent() {
//   this.handlePaymentSuccessEvent().subscribe((event) => {
//     if (event.type === 'payment_intent.succeeded') {
//       this.paymentService.getPaymentStatus().subscribe((status) => {
//         // Handle the payment status here
//       });
//     }
//   });
// }

public get KEYS(): string{
  return this._KEYS;
}
public set KEYS(value: string) {
  this._KEYS = value;
}
    
}

