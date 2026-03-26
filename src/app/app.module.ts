import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './interface/components/notfound/notfound.component';
import { ProductService } from './interface/services/product.service';
import { CountryService } from './interface/services/country.service';
import { CustomerService } from './interface/services/customer.service';
import { EventService } from './interface/services/event.service';
import { IconService } from './interface/services/icon.service';
import { NodeService } from './interface/services/node.service';
import { PhotoService } from './interface/services/photo.service';

//New TODO mydasboard
import { MydashboardComponent } from './interface/components/mydashboard/mydashboard.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandeComponent } from './interface/components/commande/commande.component';
import { EditAddBonLivraisonComponent } from './interface/components/commande/creerBonLivraison/editAddBonLivraison.component';
import { AuthService } from './interface/services/auth.service';
import { MessageService } from 'primeng/api';
import { AddExpediteurComponent } from './interface/components/expediteurs/add-expediteur/add-expediteur.component';

@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, MydashboardComponent, CommandeComponent,
        EditAddBonLivraisonComponent,
        AddExpediteurComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        CommonModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,AuthService,MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
