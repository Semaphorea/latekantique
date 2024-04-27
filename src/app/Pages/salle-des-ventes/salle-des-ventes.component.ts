import { Component, Inject , ChangeDetectorRef,CUSTOM_ELEMENTS_SCHEMA,OnInit,OnChanges,Output, DoCheck, EventEmitter} from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { Article } from '../../Entites/Entite/Article';
import { ArticleFactory, ARTICLE_TOKEN, ArticleProvider} from '../../Provider/ArticleProvider' ;  
import { ArticleComponent } from '../../Entites/Component/article/article.component';
import { PanierComponent } from '../../Entites/Component/panier/panier.component';
import { CommonModule,TitleCasePipe ,NgFor,NgIf} from '@angular/common';   
import { Observable } from 'rxjs';
import 'reflect-metadata';

@Component({   
  selector: 'app-salle-des-ventes',  
  standalone : true,
  imports: [ ArticleComponent,PanierComponent,CommonModule,FormsModule ] ,    
  templateUrl: './salle-des-ventes.component.html' ,
  styleUrls: ['./salle-des-ventes.component.scss'] , 
  // providers :[ {provide : ARTICLE_TOKEN, useFactory:ArticleFactory},TitleCasePipe ],  
  providers :[ {provide : ARTICLE_TOKEN, useClass:ArticleProvider},TitleCasePipe ],   
  schemas : [ CUSTOM_ELEMENTS_SCHEMA ],  
})  

export class SalleDesVentesComponent implements OnChanges, DoCheck {

    
      protected titlecase:TitleCasePipe;
      protected breadcrump:string[]=["accueil"];    
      protected articles :Article[];
      protected articles$ :Observable<Article[]>;
      protected panier:Article[]=[];     
      protected showpaniercomponent=false;
      protected articleprovider :ArticleProvider;
      
      @Output() panierchange = new EventEmitter<Article[]>();   
      @Output() addarticle = new EventEmitter<Observable<Article>>();    
     
      
       
      protected nbArticlesPage:number=8;  
      protected nbpages:number=2; 
      
      public constructor(
           articleprovider :ArticleProvider,
           titlecase:TitleCasePipe,
           private cdr: ChangeDetectorRef){
            
            
         //  public constructor( titlecase:TitleCasePipe,private cdr: ChangeDetectorRef){
          this.titlecase=titlecase;
         
          // const metadata = Reflect.getMetadata('Inject', SalleDesVentesComponent .prototype, 'constructor');
          //    console.log(metadata) ;
        //  this.articles$= articles$;

        this.articleprovider=articleprovider;
        console.log(this.articleprovider);
        this.articles$ =  this.articleprovider.fetchArticles();         
        //this.articles$=articles$;         
        console.log(this.articles$);
        this.articles=[];
      
       this.articles$.subscribe(
        {   next:(value:any)=>{console.log(value);  this.articles=value;},
            error:(error:Error)=>{console.error("salle des ventes L59 : ",error)},
            complete:()=>{console.log("Salle des ventes L60 subscribe complete ! ")}
                              });

        //console.log("salle des ventes L44 ",this.articles);   
      }   
      
      
           
  
     
      ngAfterViewInit(){  this.cdr.detectChanges(); }
      ngDoCheck(): void {  
        // console.log("Salle des ventes L81 : ",this.articles);
        if (this.panier) {
        // console.log("salle des ventes, onPanierChange L83",this.panierchange);  
          // console.log('salle des ventes,ngDoCheck , Panier changed L85:', this.panier); 
          this.showpaniercomponent=true;
        }   
      } 
      
      ngOnInit(){
        let path=window.location.pathname;
        path=path.substring(1,window.location.pathname.length);          
       
        if (window.location.href.indexOf(path) > -1) {
          this.breadcrump.push(path);
          document.documentElement.style.setProperty('--body-size', '40rem');  
        }

        this.articles$=this.articleprovider.fetchArticles();
      }  

      ngOnChanges(){
        console.log("OnChanges : ",this.articles);
       // this.articles=this.articleprovider.articles;  
       if(this.panier){               
          console.log('salle des ventes componente L45 , Panier : ', this.panier);}
           
      }

      onPanierChange(article:Article[]){     
       // console.log("salle des ventes, onPanierChange L72",article);  
        this.panier=article;  
        this.showpaniercomponent=true;        
       // console.log('salle des ventes, onPanierChange, L75 :',this.panier);       
  
      }

    
  


}
