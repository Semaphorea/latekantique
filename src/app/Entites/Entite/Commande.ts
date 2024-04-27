import { Article } from '../Entite/Article';
import { CommandeType } from '../Type/CommandeType';


export class Commande implements CommandeType {

  private _id?: number | undefined;
  private _idClient: number | undefined;
  private _reference: string = '';
  private _articles: Article[] = [];
  private _insurance?: number =0;
  private _totalHT: number = 0;
  private _totalTTC: number = 0;
  private _TVA: number = 0.20;
  private _currency?: string = 'euro';
  private _shipping_tax?: number | undefined;  
  private _shipping?: number | undefined;  

  

  public constructor(commande:{idClient:number, reference: string, articles: Article[], totalHT: number, id?: number, currency?: string,shipping:number, shipping_tax?: number, TVA?: number,insurance?:number}) {

    this.id = commande.id;
    this.idClient =commande. idClient;  
    this.reference =commande. reference; 
    this.articles =commande.articles;
    this.insurance= commande.insurance;
    this.totalHT = commande.totalHT;
    if(commande.TVA!=undefined){
    this._TVA = commande.TVA;}
    if (commande.currency != undefined) {
      this._currency = commande.currency;
    }

    let nbarticles= commande.articles.length;

    if(commande.shipping)this._shipping= commande.shipping*nbarticles ;

    if (commande.shipping_tax != undefined) this._shipping_tax =commande. shipping_tax*nbarticles;  

    if (this._TVA != undefined && this._shipping!=undefined &&this._insurance!=undefined ) {
      this.totalTTC =commande. totalHT * (1 + this._TVA)+this._shipping + this._insurance*nbarticles;      
    }
    else{this.totalTTC =commande. totalHT * (1 + this._TVA);}

  }


  parseJson() {


    let res = { "id": this.id, "idClient": this.idClient, "reference": this.reference, "articles": this.articles, "totalHT": this.totalHT, "totalTTC": this.totalTTC ,"currency":this.currency, "shipping":this.shipping,"shipping_tax":this.shipping_tax,"TVA":this.TVA, "insurance":this.insurance };
    console.log("Commande.ts L30", res);
    return res;
  }


  toJSON():JSON {
    let art: String[] = [];
    this.articles.forEach((value: Article) => { art.push(value.parseJson()); })
    let res = { "id": this.id, "idClient": this.idClient, "reference": this.reference, "articles": art, "totalHT": this.totalHT, "totalTTC": this.totalTTC,"currency":this.currency,"shipping":this.shipping, "shipping_tax":this.shipping_tax,"TVA":this.TVA, "insurance":this.insurance  };
    console.log("Commande.ts L30", res);
    return JSON.parse( JSON.stringify(res));  
  }





  /**
   * toJSON 
   * static : a été créée car toJSON object n'est pas reconnue en tant que fonction dans paiement.component.ts stripePaiement()
   * @param commande 
   * @param articles 
   * @returns JSON
   */
  public static toJSON(commande:Commande):JSON{let art:any = [];

    console.log('Commande.ts, toJSON L81',commande); 
    if(commande.articles!=null || commande.articles!=undefined) { let i=0; commande. articles.forEach((value: Article) => { 
      art[i]=Article.parseJson(value); 
      i=i+1; 
    }) ;    
    } 
    let res = { "id": commande.id, "idClient": commande.idClient, "reference": commande.reference, "articles": art, "totalHT": commande.totalHT, "totalTTC": commande.totalTTC,"currency":commande.currency,"shipping":commande.shipping, "shipping_tax":commande.shipping_tax,"TVA":commande.TVA, "insurance":commande.insurance  };
   // console.log("Commande.ts L30", res);
   let ret = JSON.parse( JSON.stringify(res));  
    return ret; }

  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }
  public get idClient(): number | undefined { 
    return this._idClient;
  }
  public set idClient(value: number | undefined) {
    this._idClient = value;
  }

  public get articles(): Article[] {
    return this._articles;
  }
  public set articles(value: Article[]) {
    this._articles = value;
  }
  public get insurance(): number | undefined {
    return this._insurance;
  }
  public set insurance(value: number | undefined) {
    this._insurance = value;
  }
  public get currency(): string | undefined {
    return this._currency;
  }
  public set currency(value: string) {
    this._currency = value;
  }
  public get shipping(): number | undefined {
    return this._shipping;
  }
  public set shipping(value: number | undefined) {
    this._shipping = value;
  }  
  public get shipping_tax(): number | undefined {
    return this._shipping_tax;
  }
  public set shipping_tax(value: number | undefined) {
    this._shipping_tax = value;
  }

  public get totalHT(): number {
    return this._totalHT;
  }
  public set totalHT(value: number) {
    this._totalHT = value;
  }
  public get totalTTC(): number {
    return this._totalTTC;
  }
  public set totalTTC(value: number) {
    this._totalTTC = value;
  }
  public get TVA(): number | undefined {
    return this._TVA;
  }
  public set TVA(value: number) {
    this._TVA = value;
  }

  public get reference(): string {
    return this._reference;
  }
  public set reference(value: string) {
    this._reference = value;
  }

}