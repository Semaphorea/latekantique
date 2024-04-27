import { NgModule } from '@angular/core';
import { NgxStripeModule } from "ngx-stripe";
import { BrowserModule } from '@angular/platform-browser';


// @Component({
//   selector: 'app-stripe',
//   templateUrl: './stripe.component.html',
//   styleUrls: ['./stripe.component.scss']
// })

@NgModule({
  declarations: [

  ],
  imports: [ 
    BrowserModule,
    NgxStripeModule.forRoot("sk_test_51OHDFLD5NE1kAJymV2tjTuwLg5qDp9MSfkiI7kpTP7Q8XRxWGURSsKbDvbBRbww10sQaFMVurT6L9eMQ2B1Kyw4m00JYjygWOO"),
  
  ],
  providers: [],
  
})
export class StripeComponent { 


  }