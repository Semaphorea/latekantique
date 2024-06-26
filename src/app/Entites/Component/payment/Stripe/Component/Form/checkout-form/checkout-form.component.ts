import { Component, inject, OnInit, NgModule,signal, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';



import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent
} from 'ngx-stripe';

import {
  StripeElementsOptions, 
  StripePaymentElementOptions
} from '@stripe/stripe-js';

import { PaymentService } from '../../../../Services/payment.service'; 

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  standalone: true,
  imports: [     
    ReactiveFormsModule,     
    StripeElementsDirective, 
    StripePaymentElementComponent
  ]
})
export class CheckoutFormComponent implements OnInit {
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  private readonly fb = inject(UntypedFormBuilder);
  private readonly yourOwnAPI = inject(PaymentService);

  paymentElementForm = this.fb.group({
    name: ['John doe', [Validators.required]],
    email: ['support@ngx-stripe.dev', [Validators.required]],
    address: [''],
    zipcode: [''],
    city: [''],
    amount: [2500, [Validators.required, Validators.pattern(/d+/)]]
  });

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'flat',
    },
  };

  paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: 'tabs',
      defaultCollapsed: false,
      radios: false,
      spacedAccordionItems: false
    }
  };

  // Replace with your own public key
  stripe = injectStripe(this.yourOwnAPI.StripePublicKey.toString());  
  paying = signal(false);

  ngOnInit() {
    this.yourOwnAPI
      .createPaymentIntent({
        amount: this.paymentElementForm.get('amount')!.value,
        currency: 'usd'
      })
      .subscribe((pi:any) => {
        this.elementsOptions.clientSecret = pi.client_secret as string;
      }); 
  }

  pay() {
    if (this.paying() || this.paymentElementForm.invalid) return;
    this.paying.set(true);

    const { name, email, address, zipcode, city } = this.paymentElementForm.getRawValue();

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