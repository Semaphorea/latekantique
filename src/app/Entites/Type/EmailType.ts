export type EmailType={
   
     firstname: string;
     lastname: string;
     address: string;
     subject: string;
     message: string; 
     recipientaddress?:string;
     ccaddresses?:string[]; 
     attachment? : any;  
    

}   