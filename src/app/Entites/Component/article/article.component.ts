import { Component, Inject, OnChanges, Injectable, InjectionToken, Input, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ,Output,EventEmitter} from '@angular/core';
import { CommonModule} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LoggerService } from '../../../Services/logger.service';
//import { ARTICLE_TOKEN, ArticleProvider } from '../../../Provider/ArticleProvider';

import { Observable } from 'rxjs';

// import { Article } from '../../Entite/article';  
import { Article } from '../../Entite/Article';    
import { instanciateArticlesPipe } from '../../..//Pipe/instanciateArticles';
  
@Component({
  selector: 'app-articlecomponent',
  standalone: true,
  imports: [CommonModule,instanciateArticlesPipe], 
  providers:[{ provide: Observable, useValue: Observable }],  // Observable etait importé, Je ne comprends pas l'utilité de mettre un Observable dans un provider ici mais cela fonctionne !
  template: ` 
          
     <!-- <h2>Articles</h2> -->
        
      <ul class='articlelist'  *ngIf="(articles$ | async) as articles; else loading">
       
       
      <li  *ngFor="let article of articles | instanciateArticles " class='articlesitem mx-2 w-100' >  
        
          
       <div class="card ">
        <div class='card-header'>  
          <title>{{ article.title }}</title>
          <h3>{{ article.title }}</h3>
        </div>
           <div class='card-body' >
                      
             <img src="{{ article['photo_url'] }}" alt="{{ article.title }}" title="{{ article.title }}" style='height: 200px; width:150px;' /> 
             <div class='article-description'> {{ article.description }}</div>
             <div class='article-caracteristiques article-annee'>Année : {{ article.year }}</div>
             <div class='article-caracteristiques article-nbavailable'>Nb disponibles : {{ article.availableUnits }}</div>
             <div class='article-caracteristiques article-price'>Prix : {{ article.price }}</div>      
             <button class="card-article-button" (click)="addToPanier(article)">Ajouter au panier</button>
             
           </div>   
          <div class='card-footer' ></div>      
          </div>
          </li>
         
          <nav class='pagemanagement' >
            <ul>
               <ng-container *ngIf=" nbpagetab!=null">   
               
                      <ng-container  *ngFor="let pg of nbpagetab; let i=index">                                                     
                              <ng-container class="displaypage" *ngIf="i <= nbpage-1;  ">
                                <!-- <p> index : {{i}}</p>   -->
                                <li><a href="salle-des-ventes/#{{pg+1}}" title="Page {{pg+1}}">{{pg+1}}</a></li> 
                              </ng-container>  
                        
                        </ng-container>
                </ng-container>
            </ul>
          </nav>         
        
        
        </ul>      

        <ng-template #loading>
                   Fetching Articles...
        </ng-template>

  `,
  styleUrls: ['./article.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})


export class ArticleComponent {


  //protected articles$:Observable<Article[]>|undefined=undefined;
  protected articles:Article[]|undefined=undefined;
  protected nbarticlespage: number;
  protected page: number = 1;
  protected nbpage: number;
  protected nbpagetab: number[] = []; 
  protected articleDisplay: Article[] = [];
  protected path: string = "";
  protected panier!:Article[];    
  @Output() panierchange = new EventEmitter<Article[]>();      
    
  
 
  @Input() articles$: Observable<Article[]>;   
  constructor(
    //@Inject(ARTICLE_TOKEN)articles$: Observable<Article[]>, 
    articles$:Observable<Article[]>,
    private route: ActivatedRoute
    ) {
    this.nbarticlespage = 8;
    this.nbpage = 0;
    this.articles$ = articles$; 
    this.panier=[];




    setTimeout(() => {
     if(this.articles!=undefined){
      this.nbpage = Math.ceil(this.articles.length / this.nbarticlespage);
    }

      //Boucle utilisée pour afficher la pagination 
      for (let i = 0; i <= this.nbpage; i++) {
        this.nbpagetab.push(i);
      }

      //Récupération du numéro de page  
      let indexpage = this.getPageFromUrl();
      console.log('L119', indexpage);
      indexpage != null ? this.page = indexpage : this.page = 1;

      console.log("article.component L119, Page en cours " + this.page);




      //Affichage des différentes pages
      let n = 0;
      if (this.page == 1) { n = 0; }
      else if (this.page > 1) { n = (this.page - 1) * this.nbarticlespage + 1; }
      if( this.articles!=undefined){
      this.articleDisplay = this.articles.slice(n, this.page * this.nbarticlespage);
    }

    
    }, 300);

  }

  ngOnChanges() {
    // this.page=this.getPageFromUrl();
    console.log("article.component L112, Page en cours" + this.page);

  }

  public getArticle() {
    return this.articles;
  }

  /**  
   * getPageFromUrl
   * @returns pageNumber:number
   */
  public getPageFromUrl(): number | null {
    let pageNumber :number|null= null;   

    this.route.fragment.subscribe(fragment => {
      console.log('article.component', fragment);
      fragment ? pageNumber = Number.parseInt(fragment) : pageNumber = null;

    });
    return pageNumber;
  }
  


  public addToPanier(article:Article){  
    this.panier.push(article);
    this.panierchange.emit(this.panier);       
    console.log('article.component L164, Affichage du Panier(du component present)',this.panier);
  }


}









