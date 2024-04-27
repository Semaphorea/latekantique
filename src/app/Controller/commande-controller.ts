import { NgModule, Injectable, Inject, Injector, StaticProvider } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { ApiService } from "../Services/apiService";
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Commande } from "../Entites/Entite/Commande";
import { Article } from "../Entites/Entite/Article";
import { Observable, firstValueFrom } from "rxjs";
import { COMMANDE_TOKEN, CommandeProvider, CommandeFactory } from "../Provider/CommandeProvider";
import { User } from "../Authentification/Entity/User";
import { AuthentificationController } from "../Authentification/Controller/authentificationController";

import * as crypto from "crypto";
import { AuthService, AuthServiceFactory } from "../Authentification/Service/AuthService";
import { Router } from '@angular/router';

 

@NgModule({
  imports: [HttpClientModule],

  providers: [
    {
      provide: COMMANDE_TOKEN,
      useFactory: CommandeFactory, // récupération de toutes les commandes /!\
      deps: [ApiService],
    },

  ]
})

@Injectable({
  providedIn: 'root'
})

export class CommandeController {

  private http: HttpClient | null = null;
  private apiService?: ApiService | null = null;
  private authService?: AuthService | null = null;   
  private _commande?: Commande | undefined;

  private currency?: string = 'EUR';
  private shipping_tax?: number = 0;
  private shipping: number = 6.90;
  private insurance?: number = 1000;
  private user!: User;
  private idUser: number;
  private hashUser: string;
  private authenticate: boolean = false;
  private authentificationController!: AuthentificationController;


  public constructor(@Inject(COMMANDE_TOKEN) commande: Commande,
                    authentificationController: AuthentificationController,
                   
  ) {

    const providers: StaticProvider[] = [{ provide: ApiService, useClass: ApiService }, { provide: AuthService, useFactory: AuthServiceFactory }]
    const injector = Injector.create({ providers });
    this.apiService = injector.get(ApiService);
    this.authService = injector.get(AuthService);
    this.commande = commande;

    // Creation d'un Hash pour l'utilisateur par défault                
    const hash = crypto.createHash('sha256');
    authentificationController = authentificationController;

    let idClient = authentificationController.getUserIdFromToken();
    if (idClient != null || idClient != undefined) {
      this.idUser = idClient;
      hash.update('client' + this.idUser).toString();
      this.hashUser = hash.digest('hex'); //crypto  
      this.authenticate = true;
    } else {
      this.authenticate = false;
      this.idUser = this.uid();//defaultUserId  Utile pour le stockage en LocalStorage       
      hash.update('defaultuser' + this.idUser).toString();
      this.hashUser = hash.digest('hex'); //crypto  
    }
 
    sessionStorage.setItem("currentHash", this.hashUser);

    // Assignation de l'utilisateur courant.
    let user = authentificationController.getUserFromToken();
    if (user != undefined) this.user = user;   //récupérer from token

  }


  /**
   * Function createCommande
   * @param articles 
   * @param totalHT 
   * @param id  
   */
  public async createCommande(articles: Article[], totalHT: number, id?: number): Promise<Commande | undefined> {



    let reftemp = await this.getLastReference();
    // console.log("commande-controller L113, createCommande,getLastReference : ", reftemp);
    reftemp = this.formateNewReference(JSON.parse(JSON.stringify(reftemp))['reference']);

    let tempid = await this.getLastId();
    if (tempid != undefined) {
      console.log("command-controller L116, Last-Id : ", tempid);
      id = tempid + 1;
    }

    console.log("panier.component.ts L74 : ", "reference : " + reftemp + ", totalHT : " + totalHT + ", id : " + id);


    //Cas ou le user est authentifié & Cas ou le user n'est pas authentifié


    let shippingtax = this.shipping_tax != undefined ? this.shipping_tax * articles.length : 10;

    console.log("commande-controller.ts L133, shipping charge : ", shippingtax);
    console.log("commande-controller L119, authentification : ", this.authenticate);
    console.log("commande-controller L120, userid : ", this.user);
    if (this.authenticate == false) {

      this.commande = new Commande({ idClient: this.idUser, reference: reftemp, articles: articles, totalHT: totalHT, id: id, currency: this.currency, shipping: this.shipping, shipping_tax: shippingtax, insurance: this.insurance });

      console.log("commande-controller L136 :", this.commande);
      sessionStorage.setItem("commande-temporaire-" + this.hashUser, JSON.stringify(this.commande.parseJson()));

    }

    else if (this.authenticate == true) {
      let autController: any;
      if (this.authService != null && this.authService != undefined) {
        let authS = this.authService;
        autController = new AuthentificationController(authS);
      }
      let user = await autController.getUserFromTokenToPromise();
      if (user != undefined) this.user = user;   //récupérer from token

      let commandeJSON = sessionStorage.getItem("commande-temporaire-" + this.hashUser);
      if (commandeJSON != null || commandeJSON != undefined && this.user != undefined) {
        let commandeObJSON = JSON.parse(commandeJSON);


        this.commande = new Commande({ idClient: this.user.personne_id, reference: commandeObJSON.reference, articles: commandeObJSON.articles, totalHT: commandeObJSON.totalHT, id: commandeObJSON.id, currency: this.currency, shipping: this.shipping, shipping_tax: shippingtax, insurance: this.insurance });
      }
      else {


        console.log("commande-controller L146, userid : ", this.user.personne_id);
        this.commande = new Commande({ idClient: this.user.personne_id, reference: reftemp, articles: articles, totalHT: totalHT, id: id, currency: this.currency, shipping: this.shipping, shipping_tax: shippingtax, insurance: this.insurance });

        console.log("commande-controller L136 :", this.commande);


      }

      //Persistance en sessionStorage:
      let commandeObJSON = JSON.stringify(commandeJSON);
      sessionStorage.setItem("commande-" + this.hashUser, JSON.stringify(this.commande.parseJson()));
      console.log("commande-controller L149", sessionStorage.getItem("commande-" + this.hashUser));

    }

    return this.commande;
  }

  /**
   * Function deleteCommande
   */
  public deleteCommande(id?: number) {

    if (id != null || id != undefined) {
      let obcommande: any = this.apiService?.sendData('Commande/delete/' + id, 'GET');
      firstValueFrom(obcommande).then((value: any) => { return value; });
    }
    else { sessionStorage.setItem('commande-' + this.hashUser, ''); }
  }


  /**
   * Function fetchCommandeById
   * @param id 
   * @returns 
   */
  private fetchCommandeById(id: number): Commande | undefined {
    let obcommande: any = this.apiService?.sendData('Commande', 'GET', id);

    obcommande.subscribe({
      next: (value: any) => { return new Commande({ idClient: value.userId, reference: value.reference, articles: value.articles, totalHT: value.totalHT, id: id, currency: this.currency, shipping: this.shipping, shipping_tax: value.shipping, insurance: this.insurance }) },

      error: (error: Error) => { console.error('', error); }
    })

    return undefined;
  }

  /**
   * Function fetchAllCommande
   * @returns Commande[]| undefined
   */
  private fetchAllCommande(): Commande[] | undefined {
    let obcommande: any = this.apiService?.sendData('commandes', 'GET');
    let tempcommande: Commande[] = []

    obcommande.subscribe({
      next: (value: any) => {
        value.forEach((element: any) => {
          tempcommande.push(new Commande({ idClient: element.userId, reference: element.reference, articles: element.articles, totalHT: element.totalHT, id: element.id, currency: this.currency, shipping: this.shipping, shipping_tax: element.shipping, insurance: this.insurance }));
        });
        console.log("commande-controller L92 : ", tempcommande);

        return tempcommande;
      },
      error: (error: Error) => {
        () => console.log("commande-controller L96 : ", error);

        () => console.error('', error);
      }
    })
    console.log("commande-controller,FetchAllCommande L100 : ", tempcommande);
    return tempcommande;
  }

  /**
   * Function fetchLastCommande
   * @returns Commande |undefined
   */
  private fetchLastCommande(): Commande | undefined {

    let allcommandes = this.fetchAllCommande();
    console.log("commande-controller L107 fetchLastCommande: ", allcommandes);
    if (allcommandes != undefined) { return allcommandes[allcommandes.length - 1]; }

    return undefined;

  }

  /**
   * Function extractNumber
   * @param value :string
   * @returns Number
   */
  public extractNumber(value: string) {
    let match = value.match('[1-9]');
    const firstNonZeroDigit = match ? match[0] : null;
    const position = firstNonZeroDigit ? value.indexOf(firstNonZeroDigit) : -1;
    return Number.parseInt(value.substring(position, value.length));

  }

  /**
   * Function formateNewReference
   * @param value : string
   * @returns res:string
   */
  public formateNewReference(value: string): string {
    let res: string = '';
    console.log("commande-controller.ts L146", value);
    let refnbtemp: number = this.extractNumber(value) + 1;


    console.log('commande-controller L151', refnbtemp);

    if (refnbtemp.toString.length <= 9) {
      let zerocompletion = 9 - refnbtemp.toString.length;
      let zerocomplstr = '';
      for (let l = 0; l < zerocompletion; l++) {
        zerocomplstr = zerocomplstr + '0';
      }
      res = zerocomplstr?.concat(refnbtemp.toString());
    }
    console.log("commande-controller.ts L161", res);


    return res;

  }




  /**
   * Function Promise
   * @returns Promise <id:Number> | undefined
   */
  public async getLastId(): Promise<number | undefined> {

    let id: number | undefined = undefined;
    let obs = this.apiService?.sendData('commandes/last-id', 'GET');

    if (obs != undefined) {
      id = JSON.parse(JSON.stringify(await firstValueFrom(obs)))['id'];
      console.log("commande-controller getLastId : ", id);
    } else { console.error('commande-controller.ts L140 getLastId : ', "obs undefined") }
    return id;

  }

  /**
   * Function getLastReference
   * @returns reference: Promise<string>
   */
  public async getLastReference(): Promise<string> {

    let reference!: string;
    if (this.apiService) {
      let lastRefObs = this.apiService?.sendData('commandes/last-reference', 'GET');

      if (lastRefObs != undefined) {
        return await firstValueFrom(lastRefObs);
      } else {
        console.error('commande-controller getLastReference L176', "obs undefined");

      }
    }
    return reference;
  }






  /**
   * Function nbchiffre
   * @param value 
   * @returns length:number
   */
  private nbchiffre(value: string) {
    return value.length;
  };

  /**
   * Function persist
   * @param commande 
   * return void
   **/
  public persist(commande: Commande | Commande[]): Observable<any> | undefined {

    let res: Observable<any> | undefined;
    if (Array.isArray(commande)) {
      let commandes: any = [];
      console.log('Commande-controller , persist 347', commande);

      commande.forEach(element => {
        commandes.push(Commande.toJSON(element));
      });
      res = this.apiService?.sendData("commandes/create", 'POST', commandes);
    }
    else {
      res = this.apiService?.sendData("commandes/create", 'POST', Commande.toJSON(commande));
    }

    return res;
  }

  /**
   * Function uid
   * based timestamp and seed : 10^9 
   * @returns uid:number    
   */
  uid() {
    const timestamp = Date.now().toString();
    
    const random = (Math.floor(Math.random() * 10^9)).toString();  
    const uid = parseInt(timestamp + random); 
    return uid;

  }


  //GETTERS and SETTERS

  public get commande(): Commande | undefined {
    return this._commande;
  }
  public set commande(value: Commande | undefined) {
    this._commande = value;
  }

}



