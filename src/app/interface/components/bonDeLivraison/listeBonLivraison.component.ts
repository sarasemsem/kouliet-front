import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BondeLivraisonService } from '../../services/bon-livraison.service';
import { BonDeLivraison } from '../../models/bonDeLivraison';
 
@Component({
  selector: 'app-commande',
  templateUrl: './listeBonLivraison.component.html',
  styleUrls: ['./listeBonLivraison.component.scss']
})
export class BonDeLivraisonComponent implements OnInit {

  listeBonLivraisons: BonDeLivraison[] = [];
  loading = false;
  
  constructor(
    private bonDeLivraisonService: BondeLivraisonService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.loadBonDeLivraisons();
  }
  
  loadBonDeLivraisons() {
    this.loading = true;
    this.bonDeLivraisonService.getAll().subscribe({
      next: res => {
        this.listeBonLivraisons = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
  
  creer() {
    this.router.navigate(['bon-livraison']);
  }
  editBonDeLivraison(id: number) {
    this.router.navigate(['bon-livraison', id]);
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