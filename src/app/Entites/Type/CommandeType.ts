import { ArticleType } from './ArticleType';

export type CommandeType = { 
      
    id: number | undefined ,
    reference : string |null,
    articles : ArticleType[] |null,
    totalHT : number  | null ,
    totalTTC : number|null 
    currency: string | undefined ,
    shipping_tax: number | undefined ,
    shipping: number | undefined ,
    TVA: number | undefined ,  
    

}