
import { Injectable, InjectionToken, Injector, StaticProvider } from '@angular/core';
import { Article } from '../Entites/Entite/Article';
import {ApiService} from '../Services/apiService';
import { Observable } from 'rxjs'; 


export function ArticleFactory():Observable<Article[]>{
  let articles$=new ArticleProvider().fetchArticles();
  return articles$;
}

export const ARTICLE_TOKEN = new InjectionToken<Observable<Article[]>>('ARTICLE_TOKEN');  

@Injectable({
  providedIn: 'root', // or specify a specific module where this provider should be available
})

export class ArticleProvider {
  public articles$: Observable<Article[]>= new Observable(); 
  public apiService:ApiService; 
  constructor() {  

    const providers: StaticProvider[] = [

      { provide: ApiService, useClass: ApiService }]

       const injector = Injector.create({ providers });
       this.apiService = injector.get(ApiService);   

       this.articles$=this.fetchArticles();  
    
  }

public fetchArticles():Observable<Article[]>{
  let ret=this.apiService.sendData('articles','GET');
    return ret;   
}
 
  
}



