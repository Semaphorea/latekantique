
import { NgModule, Injector,  Injectable,Inject, StaticProvider } from '@angular/core';
import { Estimation } from '../Entites/Entite/Estimation';
import { AbstractControl, FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, Observer, throwError, from, firstValueFrom, lastValueFrom } from 'rxjs';
import { Photo } from '../Entites/Entite/Photo';
import { ApiService } from '../Services/apiService';
import { LoggerService } from '../Services/logger.service';
import { BrowserModule } from '@angular/platform-browser';
import { map, catchError } from 'rxjs/operators';
import { Email } from '../Entites/Entite/Email';  
import { Client } from '../Entites/Entite/Client';


@NgModule({
  declarations: [
    // ...
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Add this line

  ],
  providers: [ApiService],

})


@Injectable({
  providedIn:'root',} 
)
export class FormEstimationController {

  private _estim: Estimation | null = null;
  private _client!: Client;

  private FormEstimationController: FormGroup | null = null;                        
  private FormClientController: FormGroup | null = null;                        
  private _photo: Photo[] | null = [];
  private http: HttpClient | null = null;
  private apiService?: ApiService | null = null;
  private email!:Email;

  public constructor( private apiServices?: ApiService, private loggerService?: LoggerService) {


    this.estim = new Estimation(null, null, null, null, null, null, null, null, null, null, null, null);
    this.FormEstimationController = null;                       
    this.FormClientController = null;                       
    this.client= new Client(null,null, null);
    //To get clean constructor arguments          
    const providers: StaticProvider[] = [  
      { provide: HttpClient, useClass: HttpClient },
      { provide: HttpHandler, useValue: HttpHandler }
    ];

    const injector = Injector.create({ providers });


    this.http = injector.get(HttpClient);

    const handler = injector.get(HttpHandler);
    this.apiService = apiServices;

    console.log(this.apiService);
    this.loggerService = new LoggerService();


  }

  public get estim(): Estimation | null {
    return this._estim;
  }
  public set estim(value: Estimation | null) {
    this._estim = value;


  }

  
  public instanciateEmail(){  
    let date=new Date().toLocaleDateString();
    let corpsEmail= `                                                             
                      Bonjour Mr ou Mme ${this.client.firstname} ${this.client.lastname} souhaite l'estimation de l'object/oeuvre ayant pour titre :  ${this.estim?.articleName!=null ?this.estim?.articleName:""}  \r\n
                      Auteur : ${this.estim?.author!=null ?this.estim?.author:""} 
                      L'oeuvre est-elle signée : ${this.estim?.signature !=null ?this.estim?.signature:""} 
                      La date de création est : ${this.estim?.creationYear!=null ?this.estim?.creationYear:""} 
                      La date de première commercialisation est : ${this.estim?.firstCommercializationYear !=null ?this.estim?.firstCommercializationYear:""} 
                      Merci de nous faire parvenir votre estimation dès que possible. 

                      ---
                      Cordialement, Mr Le Directeur de la Salle des ventes.  
                      Le ${date}
                      
                      Email du client : ${this.estim?.email} `;    


    

      this.email= new Email({firstname:`${this.client.firstname}`,lastname:`${this.client.lastname}`, subject:"Estimation",address:`${this.estim?.email}`, message: corpsEmail, recipientaddress:"semaphorea@protonmail.com",
      ccaddresses:["expert1@protonmail.com","expert2@protonmail.com","expert3@protonmail.com","expert4@protonmail.com"],
      attachment:this.estim?.photos});    
      return this.email; 
  }


  
  
  getLastId(): Observable<any> {
    if (this.apiService != null) {
      return this.apiService.sendData('expertise/last-id', '').pipe(
        map((response: any) => {
          const id = response.id;

          console.log("form-estimation-controller L170 : " + id);

          return { id: id };
        }),
        catchError((error: any) => {
          console.error('form-estimation-controller l175', error);


          return throwError(error);
        })
      ); 
    } else {
      console.error("ApiService non Fonctionnelle");
      return throwError("ApiService non Fonctionnelle");
    }
  }  



  getURL(file: File): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const dataUrl = event.target.result;
        observer.next(dataUrl);
        observer.complete();
      };
      reader.onerror = (event: any) => {
        observer.error(event.target.error);
      };
      reader.readAsDataURL(file);
    });
  }



  setValues(input: any, imagesFiles: FileList) {
    let photo: any = [];
    let phot: any = [];
    let id!: number;
    if (input.id == undefined || input.id == null) {
      this.getLastId().pipe(map((value: any) => { id = value + 1; }));
    }

    if (this.client){
      this.client.firstname=input.firstname;
      this.client.lastname= input.lastname;
      this.client.emailAddress= input.emailAddress;  
    }  
    if (this.estim) {
      this.estim.id = id;  //Valeur à récupérée dans la base de donnée
      this.estim.email = input.email;
      this.estim.articleName = input.articleName;
      this.estim.features = input.features;
      this.estim.defaults = input.defaults;
      this.estim.signature = input.signature;
      this.estim.author = input.author;
      this.estim.creationYear = input.creationYear;
      this.estim.firstCommercializationYear = input.firstCommercializationYear;
    }

 

    const observer: Observer<string> = {
      next: (value: any) => { if (value) { phot.push(value) }; },
      error: (err: any) => console.error(err),
      complete: () => { console.log("Observable completed"); }
    }


    if (this.estim) {
      //Mouillage de l'ensemble des photos d'une entrée

      let i = 0;
      for (i; i < imagesFiles.length; i++) {
        this.getURL(imagesFiles[i]).subscribe(observer);

        photo.push(new Photo(
          i + 10 * imagesFiles[i].lastModified,    //Améliorer le systeme d'identification des photos
          imagesFiles[i].name,
          new Date(imagesFiles[i].lastModified),
          this.estim.features,
          URL.createObjectURL(imagesFiles[i]),
          ""
        ));
        // Attention l'url est sous forme de blob URL
        // console.log("L67 Form estimation controller");
        // console.log(photo);
      }

      this.estim.photos = photo;
      this.estim.estimatedPrice = input.estimatedPrice;
      this.estim.assessment = input.assessment;


      //  console.log("Form-estimation-controller L152 ");
      //  console.log(this.estim);

      if (!this.loggerService) { console.log('L155 LoggerService undefined'); }  
      else {
        this.loggerService?.printLineTrace('Form-estimation-controller');
        this.loggerService?.printStackTrace();
      }
    }



  }
  async sendData(estim: Estimation): Promise<any> {
    let expertiseId!: number;
    let resPromise!: Promise<any>;


    let id!: number;

    lastValueFrom(this.getLastId()).then((value) => { estim.id = Number.parseInt(value.id) + 1; resPromise = lastValueFrom(this.apiService!.sendData('expertise/submit-form', 'POST', estim)); console.log("form-estimation-controller L217 , Valeur : ", value); return value; })
      .catch((error: any) => { console.error('form-estimation-controller L228', error) });

    return resPromise;

  }


  

  public get client(): Client {
    return this._client;
  }
  public set client(value: Client) {
    this._client = value;
  }
  public get photo(): Photo[] | null {
    return this._photo;
  }
  public set photo(value: Photo[] | null) {
    this._photo = value;
  }


  public setValue(f: NgForm, imageFiles: FileList): void {
    //  console.log("FormEstimationController l68 "); 
    //  console.log(f.form.value);

    let image = f.form.value;


    this.setValues(f.form.value, imageFiles);
   
    if (this.client){
      this.FormClientController= new FormGroup({
      firstname:new FormControl(this.client.firstname),
      lastname:new FormControl( this.client.lastname),
      })}
    

    if (this.estim) {
      this.FormEstimationController = new FormGroup({
        id: new FormControl(this.estim.id),
        email: new FormControl(this.estim.email),
        articleName: new FormControl(this.estim.articleName),
        features: new FormControl(this.estim.features),
        defaults: new FormControl(this.estim.defaults),
        signature: new FormControl(this.estim.signature),
        author: new FormControl(this.estim.author),
        creationYear: new FormControl(this.estim.creationYear),
        firstCommercializationYear: new FormControl(this.estim.firstCommercializationYear),
        photos: new FormControl(this.estim.photos),
        estimatedPrice: new FormControl(this.estim.estimatedPrice),
        assessment: new FormControl(this.estim.assessment)

      })
    } 




  }}






