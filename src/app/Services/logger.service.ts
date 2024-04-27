import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  
  log(message: any) {
    console.log(message);
  }

  error(message: any) {
    console.error(message);
  }

  warn(message: any) {
    console.warn(message);
  }

  public printStackTrace(){
    var e= new Error();
  
    var stack = e.stack?.toString().split(/\r\n|\n/);
    if (stack != undefined){
           console.log(stack);   
    }
    
   

  }
  
  public printLineTrace(information:string){
    var e= new Error();
    
    var stack = e.stack;

    if (stack != undefined){
      let stackvar=stack[1];
      let i= stackvar.slice(stackvar.length-5,stackvar.length);
      console.debug("line:"+i ,information );
    }
  }

  public printLineTraceOb(ob:object){  
    var e= new Error();
    
    var stack = e.stack;

    if (stack != undefined){
      let i= stack[1].slice(stack[1].length-5,stack[1].length);
      console.debug("line:"+i ,ob );
    }
  }

}