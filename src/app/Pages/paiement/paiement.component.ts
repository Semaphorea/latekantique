import { CUSTOM_ELEMENTS_SCHEMA, Component, Injector, StaticProvider, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Commande } from '../../Entites/Entite/Commande';
import { NgIf, CommonModule } from "@angular/common";
import { CommandeController } from '../../Controller/commande-controller';
import { TitleCasePipe } from '@angular/common';
import { ApiService } from '../../Services/apiService';
import { Observable, map, of } from 'rxjs';
import { PaypalComponent } from '../../Entites/Component/payment/Paypal/paypal/paypal.component';
import { CommandeControllerService } from '../../Services/ControllerService/CommandeControllerService';
 

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  standalone: true,
  imports: [NgIf, CommonModule, PaypalComponent, FormsModule],
  providers:
    [TitleCasePipe,
      // PaymentService
    ],
  styleUrls: ['./paiement.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaiementComponent {

  
  protected commande!: Commande;
  protected commandevalidee: boolean;
  protected titlecase: TitleCasePipe;
  protected paimenttype!: string;
  protected breadcrump: string[] = ["accueil"];
  protected apiService: ApiService;
  
  //protected paimentStatus!:string;

  protected commandeController: CommandeController;

  constructor(titlecase: TitleCasePipe,
    // private paimentService:PaymentService,
    commmandeControllerService: CommandeControllerService
  ) {


    let currentHash = sessionStorage.getItem('currentHash');
    // console.log(sessionStorage.getItem("commande-temporaire-" + currentHash));
    let command = JSON.parse(sessionStorage.getItem("commande-temporaire-" + currentHash)!);
    this.commande = command;

    this.paimenttype = sessionStorage.getItem("paimenttype")!;
    this.commandevalidee = false;
    this.titlecase = titlecase;

    const providers: StaticProvider[] = [
      { provide: ApiService, useClass: ApiService }]
    const injector = Injector.create({ providers });
    this.apiService = injector.get(ApiService);


    this.commandeController = commmandeControllerService.commandeController;

  }




  ngAfterView() { if (this.paimenttype = "cheque") { this.commandevalidee = true; } }

  ngOnInit() {

    if (this.paimenttype == "carte") { this.stripePaiment(); }


    let path = window.location.pathname;
    path = path.substring(1, window.location.pathname.length);

    if (window.location.href.indexOf(path) > -1) {
      this.breadcrump.push(path);
      document.documentElement.style.setProperty('--body-size', '40rem');
    }


  }


  public stripePaiment(): Observable<any> {
    console.log("paiement.component l89 : ", this.commande);
    //ToDebug :  /!\ bug la fonction objet toJSON n'est pas reconnue en tant que fontion dans core.js d'où utilisation d'une fonction toJSON static  
    let commandeParse = Commande.toJSON(this.commande);
    let ret = this.apiService.sendData('create-checkout-session', 'POST', commandeParse);

    ret.subscribe({
      next: (value: any) => { console.log(value); window.location.href = value.sessionURL; },
      error: (error: Error) => { console.error(error) },
      complete: () => { console.log("paiement.componenent L83", "observable consumed") }
    });

    console.log("stripePaiment finalisé");
    return ret;
  }






  //Gestion Retour CardPaiment
  // Géré directement pour le moment dans le backend avec une url success et fail
  // Mais solution moyennement satisfaisante  
  // handlePaymentCallback(response: any) {
  //   if (response.success) {
  //     this.paimentService.updatePaimentStatus('success');  
  //   } else {
  //     this.paimentService.updatePaimentStatus('failure');
  //   } 
  // }


}
