
import { PersonneType } from "../../Entites/Type/Personne";


export class User {

    private _id: number=0; 
    private _id_personne:number=0;  
    private _identifiant: string="";          
    private _password: string="";  
 
    public constructor(...args:any){

        let nb=args.length;  
        switch(nb){
            case 0 :()=>{};break;
            case 4 :(id:number,id_personne:number,identifiant:string,password:string)=>{                 
                        this._id=id;
                        this._id_personne=id_personne;
                        this._identifiant=identifiant;       
                        this._password=password;   
            }
        }
    }


    toJson(){
        return '{"id":'+this.id+','+
              '"id_personne":'+this.id_personne+','+
              '"identifiant":"'+this.identifiant+'",'+
              '"password":"'+this.password+'"}';
                      
  
      }


    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }
    public get identifiant(): string {
        return this._identifiant;
    }
    public set identifiant(value: string) {
        this._identifiant = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get id_personne(): number {
        return this._id_personne;
    }
    public set personne_id(value: number) {
        this._id_personne = value;
    }
    
}


