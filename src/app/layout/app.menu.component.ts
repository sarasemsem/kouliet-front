import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Gestion des bons de commandes',
                items: [
                    { label: 'Bon de livraison', icon: 'pi pi-fw pi-id-card', routerLink: ['/commande'] },
            
                ]
            },
            {
                label: 'Gestion Utilisateurs',
                items: [
                    { label: 'Ajouter un expediteur', icon: 'pi pi-fw pi-id-card', 
                        items: [
                            { label: 'Ajouter', icon: 'pi pi-plus', routerLink: ['/expediteurs/add'] },
                            { label: 'Consulter', icon: 'pi pi-search', routerLink: ['/expediteurs/list'] },
                            { label: 'Modifier', icon: 'pi pi-pencil', routerLink: ['/expediteurs/edit'] },
                            { label: 'Désactiver', icon: 'pi pi-ban', routerLink: ['/expediteurs/deactivate'] }
                        ]
                    },
                    
                    { label: 'Ajouter un manager', icon: 'pi pi-fw pi-id-card', routerLink: ['/commande'] },
                    { label: 'Ajouter un Livreur', icon: 'pi pi-fw pi-id-card', routerLink: ['/commande'] },
                    { label: 'Ajouter un prestataire', icon: 'pi pi-fw pi-id-card', routerLink: ['/commande'] },
            
                ]
            }
        ];
    }
}
