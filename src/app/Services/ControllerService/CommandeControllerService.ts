import { Injectable, InjectionToken } from "@angular/core";
import { CommandeController } from "../../Controller/commande-controller";

export const COMMANDECONTROLLERSERVICE_TOKEN = new InjectionToken<CommandeController>('COMMANDECONTROLLERSERVICE_TOKEN');

@Injectable({ 
    providedIn: 'root'
  })
export class CommandeControllerService{
   

    private _commandeController!: CommandeController;
    private _uid!: number;

    constructor(){
     this._uid=this.uidsupl();
    }


    /**
    * Function uid
    * based timestamp and seed : 10^9 
    * @returns uid:number    
    */
    uidsupl() {  
     const timestamp = Date.now().toString();
     const random = (Math.floor(Math.random() * 10^9)).toString();
     console.log("CommandeControllerService L28 uidsupl" , random);
     const uid = parseInt(timestamp + random);
     return uid;
 
   }

    public get commandeController(): CommandeController {
        return this._commandeController;
    }
    public set commandeController(value: CommandeController) {
        console.log("CommandeControllerService L21","commande Controller prêt à fonctionner");
        this._commandeController = value;   
    }
    public get uid(): number {
        return this._uid;
    }
    public set uid(value: number) {
        this._uid = value;
    }
   
}