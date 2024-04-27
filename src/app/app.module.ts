import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ApplicationRef } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ArticleProvider, ARTICLE_TOKEN } from './Provider/ArticleProvider';
import { PhotoComponent } from './Entites/Component/photo/photo.component';
import { COMMANDE_TOKEN, CommandeProvider } from './Provider/CommandeProvider';


import { AccueilComponent } from './Pages/accueil/accueil.component';
import { EstimationComponent } from './Pages/estimation/estimation.component';
import { SalleDesVentesComponent } from './Pages/salle-des-ventes/salle-des-ventes.component';
import { EvenementsComponent } from './Pages/evenements/evenements.component';
import { ContactComponent } from './Pages/contact/contact.component';
import { CreditsComponent } from './Pages/credits/credits.component';
import { PanierComponent } from './Entites/Component/panier/panier.component';
import { FactureComponent } from './Entites/Component/facture/facture.component';
import { CommandeComponent } from './Pages/commande/commande.component';
import { EntravauxComponent } from './Pages/Annexes/entravaux/entravaux.component';
import { Erreur404Component } from './Pages/Annexes/erreur404/erreur404.component';
import { MentionslegalesComponent } from './Pages/mentionslegales/mentionslegales.component';
import { HeaderComponent } from './Pages/Structure/header/header.component';
import { NavComponent } from './Pages/Structure/listepage/listepage.component';
import { FooterComponent } from './Pages/Structure/footer/footer.component';

import { AuthInterceptor, AUTHINTERCEPTOR_TOKEN } from './Authentification/Interceptor/AuthInterceptor';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormCreateClientComponent } from './Form/form-create-client/form-create-client.component';
import { FormContactComponent } from './Form/form-contact/form-contact.component';
import { FormAuthenticationComponent } from './Authentification/Component/form-authentication/form-authentication.component';
import { FormEstimationComponent } from './Form/form-estimation/form-estimation.component';
// import { FormEstimation2Component } from './Form/form-estimation2/form-estimation2.component';

import { AuthentificationController } from './Authentification/Controller/authentificationController';
import { CommandeController } from './Controller/commande-controller';
import { PaiementComponent } from './Pages/paiement/paiement.component';
import { OverviewcommandeComponent } from './Entites/Component/overviewcommande/overviewcommande.component';
import { StripeComponent } from './Entites/Component/payment/Stripe/stripe/stripe.component';

import { IdentityComponent } from './Entites/Component/payment/Stripe/Component/identity/identity.component';
import { CheckoutComponent } from './Entites/Component/payment/Stripe/Component/checkout/checkout.component';

import ExpressCheckoutElementComponent from './Entites/Component/payment/Stripe/Component/Form/express-checkout-element/express-checkout-element.component';
import { CheckoutFormComponent } from './Entites/Component/payment/Stripe/Component/Form/checkout-form/checkout-form.component';
import { PaypalComponent } from './Entites/Component/payment/Paypal/paypal/paypal.component';
import { CurrencyComponent } from './Form/form-currency/from-currency.component';
import { ListViewComponent } from './Entites/Component/list-view/list-view.component';
import { PaiementconfirmationComponent } from './Pages/paiementconfirmation/paiementconfirmation.component';
import { CommandeControllerService, COMMANDECONTROLLERSERVICE_TOKEN } from './Services/ControllerService/CommandeControllerService';
import { EmailService } from './Services/emailService';



@NgModule({
  declarations: [

    ContactComponent,

    EstimationComponent,
    EntravauxComponent,
    Erreur404Component,
    FactureComponent,

    MentionslegalesComponent,
    PhotoComponent,

    //StripeComponent,

    CheckoutComponent,
    IdentityComponent,
    CommandeComponent,
    PaiementconfirmationComponent,


  ],

  imports: [

    AuthInterceptor,
    AppComponent,
    AppRoutingModule,
    BrowserModule,

    AccueilComponent,

    CheckoutFormComponent,
    CreditsComponent,
    CurrencyComponent,
    ExpressCheckoutElementComponent,
    EvenementsComponent,
    FormAuthenticationComponent,
    ListViewComponent,
    SalleDesVentesComponent,
    // Erreur404Component, cause : node_modules/@ngtools/webpack/src/ivy/index.js):Error: Maximum call stack size exceeded
    // EntravauxComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,


    FormContactComponent,


    FormCreateClientComponent,
    // FormEstimation2Component,     
    FormEstimationComponent,
    OverviewcommandeComponent, 
    PaiementComponent,
    PanierComponent,
    PaypalComponent,
    HttpClientModule,
    NgbModule,


  ],

  providers: [
    { provide: ARTICLE_TOKEN, useClass: ArticleProvider },
    { provide: COMMANDE_TOKEN, useClass: CommandeProvider },
    { provide: AUTHINTERCEPTOR_TOKEN, useClass: AuthInterceptor },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },// Set to true to allow multiple interceptors
    //  { provide : COMMANDECONTROLLERSERVICE_TOKEN ,useClass: CommandeControllerService },
    CommandeControllerService,
    CommandeController,  
    EmailService,   
  
  ], 


})


export class AppModule {

  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}



