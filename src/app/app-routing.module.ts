import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './interface/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { MydashboardComponent } from './interface/components/mydashboard/mydashboard.component';
import { CommandeComponent } from './interface/components/commande/commande.component';
import { EditAddBonLivraisonComponent } from './interface/components/commande/creerBonLivraison/editAddBonLivraison.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./interface/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'commande', component: CommandeComponent},
                    { path: 'bon-livraison/modifier/:commandeId', component:  EditAddBonLivraisonComponent},
                    {
                        path: 'bon-livraison/creer',
                        component: EditAddBonLivraisonComponent
                      },
                     { path: 'mydashboard', component: MydashboardComponent },
                ],
            },
            { path: 'auth', loadChildren: () => import('./interface/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./interface/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
