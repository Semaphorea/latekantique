
import { PhotoType } from '../Type/PhotoType';

export  class Photo implements  PhotoType { 
    public id: number | null;
    public title: string | null;
    public date: Date | null;
    public description: string | null;
    public photo_url: string | null;
    public photo_directory: string | null;
   

    public constructor(       
        id: number | null,
        title: string | null,
        date: Date | null,
        description: string | null,
        photo_url: string | null,
        photo_directory: string | null,
     ) {

   
        this.id = id;
        this.title = title;
        date ? this.date = new Date(date): this.date=null;
        this.description = description;
        this.photo_url = photo_url;
        this.photo_directory = photo_directory;
      
    }


    getId(){return this.id;}
    getTitle(){return this.title;}
    getDate(){return this.date;}
    getDescription(){return this.description;}
    getURL(){return this.photo_url;}
    getDirectory(){return this.photo_directory;}
    
 
    public clone(): Photo {
          return new Photo(
            this.id,
            this.title,
            this.date,
            this.description,
            this.photo_url,
            this.photo_directory,
    
          );
        }
            
  
}