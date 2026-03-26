import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './interface/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { MydashboardComponent } from './interface/components/mydashboard/mydashboard.component';
import { AuthGuard } from './interface/components/auth/auth.guard';
import { GuestGuard } from './interface/components/auth/guest-guard.guard';
import { BonDeLivraisonComponent } from './interface/components/bonDeLivraison/listeBonLivraison.component';
import { EditAddBonLivraisonComponent } from './interface/components/bonDeLivraison/creerModifierBonLivraison/editAddBonLivraison.component';
import { AddExpediteurComponent } from './interface/components/expediteurs/add-expediteur/add-expediteur.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./interface/components/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },
      { path: 'listeBonLivraison', component: BonDeLivraisonComponent },
      { path: 'bon-livraison/:commandeId', component: EditAddBonLivraisonComponent },
      { path: 'bon-livraison', component: EditAddBonLivraisonComponent },
      { path: 'mydashboard', component: MydashboardComponent },
      { path: 'expediteurs/add', component: AddExpediteurComponent },

    ]
  },
  {
    path: 'auth',
    canActivate: [GuestGuard],
    loadChildren: () =>
      import('./interface/components/auth/auth.module')
        .then(m => m.AuthModule)
  },
  {
    path: 'landing',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./interface/components/landing/landing.module')
        .then(m => m.LandingModule)
  },
  { path: 'pages/notfound', component: NotfoundComponent },
  { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
