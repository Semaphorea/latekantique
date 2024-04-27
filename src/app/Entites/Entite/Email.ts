


import {EmailType} from "../Type/EmailType";


export class Email  implements EmailType{

    public firstname: string;
    public lastname: string;
    public address: string;
    public subject: string;
    public message: string;
    public recipientaddress?: string;
    public ccaddresses?: string[]; 
    public attachment?: any;  
    
    
    constructor(email:{firstname: string,
        lastname: string,
        address: string,
        subject: string,  
        message: string,
        recipientaddress?: string,
        ccaddresses?:string[],
        attachment?:any}) {
            
    
        this.firstname =email.firstname;
        this.lastname =email.lastname;
        this.address = email.address;
        this.recipientaddress =email.recipientaddress;
        this.ccaddresses=email.ccaddresses;
        this.subject = email.subject;
        this.message =email.message;
        this.attachment  = email.attachment;  
    }

}