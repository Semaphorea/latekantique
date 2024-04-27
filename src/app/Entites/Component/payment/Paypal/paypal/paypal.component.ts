import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NgModule, OnInit } from '@angular/core';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { loadScript } from "@paypal/paypal-js";
import { Commande } from '../../../../Entite/Commande';




@Component({
  selector: 'app-paypal',
  standalone: true,
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.scss'],
  imports: [
    //BrowserModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})

export class PaypalComponent {
  YOUR_CLIENT_ID: string = 'AS18aeFMAxFih_2bYiHEpfmDzSKum0m6G7k8QC2R3l9fQ8bQAnAsTdZfM2DKhIGmRgUR75rXZumtDh79'; 
  paypal:any;  // Paypal JS SDK script  


  @Input() commande!:Commande; 
  constructor(){}

  ngOnInit() {
    console.log("paypal", "paypal init");
    loadScript({ clientId: this.YOUR_CLIENT_ID,
     
      })
      .then((paypal) => {
        this.paypal=paypal;
               this.paypal.Buttons().render("#paypal-button");   
      
        // start to use the PayPal JS SDK script
      })
      .catch((err) => {
        console.error("failed to load the PayPal JS SDK script", err);
      });
  }  

 


  async createOrder() {
    // Order is created on the server and the order id is returned


    console.log("paypal.component ,commande : ",this.commande);
    const response = await fetch("/api/create-paypal-order", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: "1",    //"YOUR_PRODUCT_STOCK_KEEPING_UNIT",
            quantity:"1" ,// "YOUR_PRODUCT_QUANTITY",
            currency_code:"EUR", //USD, EUR, 
            //hypothèse:
            //business:"", //email of paypal account

            tax_cart:this.commande.TVA, 
            price:this.commande.totalHT,

            item_name_1:this.commande.reference, 
          

          },
        ],
      }),
    });
    const order = await response.json();
    return order.id;
  }

  async onApprove(data: any, actions: any) {
    // Order is captured on the server
    const response = await fetch("/api/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID
      })
    });
    return await response.json();
  }
}  
