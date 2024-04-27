import { Injectable, Injector,NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClient,HttpHandler,HttpHeaders, HttpXhrBackend} from '@angular/common/http';
// import { HttpHeaders ,HttpClient, HttpClientModule} from '@angular/common/http';
import { environnment } from '../Configuration/Environnement/environnement';
import {Observable, from } from 'rxjs'; //To convert Promise in Observable
import {AuthInterceptor } from '../Authentification/Interceptor/AuthInterceptor';
@NgModule({declarations:[],
          //imports:[HttpClientModule],
          providers:[{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi: true // Set to true to allow multiple interceptors
        }],
})
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environnment.backendAPI; // Replace with your API URL
  private http: HttpClient | null = null;
  constructor() {

  const httpHandler = new HttpXhrBackend({ build: () => new XMLHttpRequest() });
  this.http = new HttpClient(httpHandler);
    
   }

  getArticles(): Observable<any> {  
    let res:any;
    if(this.http!=null){
    let res=this.http.get(`${this.apiUrl}/articles`);
    console.log(res);}
    return res ; 
  }
 
   /**
    * Function sendData
    * Requetes avec methode Get ou Post
    * @param callApi 
    * @param method 
    * @param data   
    * @returns Observable<any>
    */
   sendData(callApi:string,method:string,data?:any):Observable<any>{
    let ret:any;  

    console.log("apiService L44",callApi);
    console.log("apiService l45",data); 
    if(this.http){     
       const headers = new HttpHeaders({ 
                                         'Access-Control-Allow-Origin': '*', 
                                         'Content-Type': 'application/json', 
                                         'Access-Control-Allow-Methods':method,
                                         'Access-Control-Allow-Headers':'Content-Type'
                                         });       
                          
                                         
       data!=null || data != undefined ? (data:any)=>{console.log('apiService L51 : api/'+callApi+"/"+data)}:null;  

        method=='GET'? ret=from(this.http.get('api/'+callApi,{headers})) : ret=from(this.http.post('api/'+callApi,data,{headers:headers}));   
            
       console.log("apiService, sendData L55 : ",ret);  
    } else {
      ret=new Observable<any>();
    }      
      
    return ret;
 }

    /**
    * Function sendData
    * Requetes avec methode Get ou Post
    * @param callApi 
    * @param method 
    * @param data   
    * @returns Observable<any>
    */
   sendDataExtern(request:string,method:string,data?:any):Observable<any>{
    let ret:any;  
    if(this.http){     
       const headers = new HttpHeaders({ 
                                         'Access-Control-Allow-Origin': '*', 
                                         'Content-Type': 'application/json', 
                                         'Access-Control-Allow-Methods':method,
                                         'Access-Control-Allow-Headers':'Content-Type'
                                         });       
                                          
       

        method=='GET'? ret=from(this.http.get( request,{headers})) : ret=from(this.http.post( request,data,{headers:headers})); 
            
       console.log("apiService, sendExternData L52 : ",ret);  
    } else {
      ret=new Observable<any>();
    }      
    
    return ret;
 }







}
