import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AccueilComponent } from './Pages/accueil/accueil.component';
import { EstimationComponent } from './Pages/estimation/estimation.component';
import { EvenementsComponent } from './Pages/evenements/evenements.component'; 
import { ContactComponent } from './Pages/contact/contact.component'; 
import { MentionslegalesComponent } from './Pages/mentionslegales/mentionslegales.component'; 
import { SalleDesVentesComponent } from './Pages/salle-des-ventes/salle-des-ventes.component';   
import { CreditsComponent } from './Pages/credits/credits.component';
import { CommandeComponent } from './Pages/commande/commande.component';  
import { PaiementComponent } from './Pages/paiement/paiement.component';
import { Erreur404Component } from './Pages/Annexes/erreur404/erreur404.component';
import { EntravauxComponent } from './Pages/Annexes/entravaux/entravaux.component';
import { PaiementconfirmationComponent } from './Pages/paiementconfirmation/paiementconfirmation.component';
 

 
const routes: Routes =  [         
                          { path: '', component: AccueilComponent },
                          { path: 'accueil', component: AccueilComponent },
                          { path: 'salle-des-ventes', component: SalleDesVentesComponent },
                          { path: 'estimation', component: EstimationComponent },
                          { path: 'evénements', component: EvenementsComponent },
                          { path: 'contact', component : ContactComponent },
                          { path: 'mentionslegales', component: MentionslegalesComponent },
                          { path: 'salle-des-ventes', component: SalleDesVentesComponent },   
                          { path: 'credits', component: CreditsComponent },   
                          { path: 'commande', component: CommandeComponent },                       
                          { path: 'paiement', component: PaiementComponent },  
                          { path: 'paiementconfirmation/:paimentStatus&:session_id', component: PaiementconfirmationComponent },                                              
                          { path: 'in_construction' , component: EntravauxComponent },                                           
                          { path: 'not_found' , component: Erreur404Component },     
                          { path: "**", redirectTo: "not_found" },                       
                                        
                        ];      


                                          
@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})


export class AppRoutingModule {



 }
