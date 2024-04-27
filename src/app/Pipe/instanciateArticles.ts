import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../Entites/Entite/Article';
@Pipe({
  name: 'instanciateArticles',
  standalone:true,
})

export class instanciateArticlesPipe implements PipeTransform {

    transform(articles: any):Article[]{
        articles=articles['articles'];
        console.log("instanciateArticles L12 : ",articles['articles']);
        let arti:Article[]=[];
        if (Array.isArray(articles)){ 
        arti=articles.map( (value:any)=>{return new Article(value.id,value.title,value.description,value.photo_url, value.availableUnits,value.quantity, value.year, value.price);});
        
    }
    
    console.log("instanciateArticle.ts L13 : ", arti);  
        return arti;
    }
    
  
}

