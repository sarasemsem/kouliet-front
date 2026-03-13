import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Commande } from '../../models/bonCommande';
import { BondeLivraisonService } from '../../services/bon-livraison.service';

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

  bonCommandes: Commande[] = [];
  loading = false;
  
  constructor(
    private commandeService: BondeLivraisonService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.loadCommandes();
  }
  
  loadCommandes() {
    this.loading = true;
    this.commandeService.getAll().subscribe({
      next: res => {
        this.bonCommandes = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  
  creer() {
    this.router.navigate(['bon-livraison/creer']);
  }
  editCommande(id: number) {
    this.router.navigate(['bon-livraison/modifier', id]);
  }
  
  clear(table: any) {
    table.clear();
  }
  
  onGlobalFilter(table: any, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }
}