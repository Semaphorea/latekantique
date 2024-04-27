import { Component, NgModule } from '@angular/core';
import { ArticleType } from '../Type/ArticleType';


export class Article implements ArticleType{


    public id: number | null;
    public title: string | null;
    public description: string | null;
    public photo_url: string | null;
    public availableUnits: number | null;
    public quantity: number | null;
    public year: number | null;
    public price: number | null;
 
    public constructor(id: number, title: string, description: string, photo_url: string, availableUnits: number,quantity:number, year: number, price: number) {
    
        this.id = id;
        this.title = title;
        this.description = description;
        this.photo_url = photo_url;
        this.availableUnits = availableUnits;
        this.quantity=quantity;
        this.year = year;
        this.price = price;

    }  

  /**
   * Function parseJson
   * @returns String Compatible format JSON
   */
    parseJson(){    

        return '{"id":'+this.id+',"title": '+this.title+', "description": '+this.description+', "photo_url": '+this.photo_url+', "availableUnits": '+this.availableUnits+', "quantity":'+this.quantity+',"year": '+this.year+', "price": '+this.price+'}'; 
 
   }


   /**
    * parseJson
    * static
    * a été créée car parseJSON object n'est pas reconnue en tant que fonction dans paiement.component.ts stripePaiement() 15/12/2023
    * @param article 
    * @returns 
    */
   static parseJson(article:Article):JSON{     
    let str='{"id":'+article.id+',"title": "'+article.title+'", "description": "'+article.description+'", "photo_url": "'+article.photo_url+'", "availableUnits": '+article.availableUnits+', "quantity":'+article.quantity+',"year": '+article.year+', "price": '+article.price+'}';
    let ret= JSON.parse(str);      
  return ret;

}

}