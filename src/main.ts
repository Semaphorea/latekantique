import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


// bootstrapApplication(AppComponent,
//   {
//     providers: [
//       provideRouter(routes, withComponentInputBinding())
//     ]    
//   }  
// );  
  


//Creation de platform initiale
platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));


  

 