import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject, inject, signal, ViewChild } from '@angular/core';

import {
  injectStripe,
  StripeElementsDirective,
  StripeExpressCheckoutComponent,
  StripePaymentElementComponent
} from 'ngx-stripe';
import {
  StripeElementsOptions,
  StripeExpressCheckoutElementClickEvent,
  StripeExpressCheckoutElementConfirmEvent,
  StripeExpressCheckoutElementOptions,
  StripeExpressCheckoutElementShippingAddressChangeEvent,
  StripeExpressCheckoutElementShippingRateChangeEvent
} from '@stripe/stripe-js';

import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { TOKEN_PAYMENTSERVICE,PaymentService, PaymentFactory } from '../../../../Services/payment.service'
import { Validators ,UntypedFormBuilder} from '@angular/forms';

@Component({
  selector: 'app-express-checkout-element',
  templateUrl: './express-checkout-element.component.html',
  standalone: true,
  imports: [
    StripeElementsDirective,
    StripeExpressCheckoutComponent
  ],
  providers:[{provide:TOKEN_PAYMENTSERVICE,useFactory:PaymentFactory}],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export default class ExpressCheckoutElementComponent {
  @ViewChild(StripeExpressCheckoutComponent)
  paymentElement!: StripePaymentElementComponent;
  expressCheckout!: StripeExpressCheckoutComponent;
  private readonly fb = inject(UntypedFormBuilder);
  private readonly yourOwnAPI = inject(PaymentService);
  protected shippingAddressEvent!:StripeExpressCheckoutElementShippingAddressChangeEvent;
  protected shippingRateEvent!:StripeExpressCheckoutElementShippingRateChangeEvent;

  constructor(@Inject(TOKEN_PAYMENTSERVICE)paymentService:PaymentService){

  }


  stripe = injectStripe(new PaymentService().KEYS); 
  paying = signal(false);


  //Must be injected in constructor?
  checkoutFormComponent: any;
  
  paymentElementForm = this.fb.group({
    name: ['John doe', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [2500, [Validators.required, Validators.pattern(/d+/)]]
  });

  
  elementsOptions: StripeElementsOptions = {
    mode: 'payment',
    amount: 1099,
    currency: 'eur',
    locale: 'fr',
    //clientSecret: '{ YOUR_CLIENT_SECRET  }'
  };

  options: StripeExpressCheckoutElementOptions = {
    buttonType: {
      applePay: 'buy',
      googlePay: 'buy'
    }
  };


  
  onClicked(event: StripeExpressCheckoutElementClickEvent) {
    const { elementType, expressPaymentType, resolve } = event;

    // You must call the resolve function within 1 second
  }

  onConfirm(event: StripeExpressCheckoutElementConfirmEvent) {
    const {  expressPaymentType, paymentFailed } = event;

    // You can only call `paymentFailed` before calling `confirmPayment` to signal
    // an error before payment confirmation.

    this.stripe
      .confirmPayment({
        elements: this.expressCheckout.elements,
        clientSecret: this.elementsOptions.clientSecret!,
        confirmParams: {
          return_url: 'https://ngx-stripe.dev'
        }
      })
      .subscribe((result) => {
        // Handle result.error or result.paymentIntent
      });
  }

  onCancel(){
    //handle cancel event
  }
  onShippingAddressChange(event: StripeExpressCheckoutElementShippingAddressChangeEvent) {
    const { name, address, resolve, reject } = event;
    const { city, state, postal_code, country } = address;

    // handle shippingaddresschange event

    // call event.resolve within 20 seconds
  }

  onShippingRateChange(event: StripeExpressCheckoutElementShippingRateChangeEvent) {
    const { shippingRate, resolve, reject } = event;
    const { id, amount, displayName } = shippingRate;

    // handle shippingratechange event

    // call event.resolve within 20 seconds
  }
  pay() {
    if (this.paying() || this.paymentElementForm.invalid) return;
    this.paying.set(true);

    const { name, email, address, zipcode, city } = this.checkoutFormComponent.getRawValue();

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: name as string,
              email: email as string,
              address: {
                line1: address as string,
                postal_code: zipcode as string,
                city: city as string
              }
            }
          }
        },
        redirect: 'if_required'
      })
      .subscribe(result => {
        this.paying.set(false);
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
  }
}
