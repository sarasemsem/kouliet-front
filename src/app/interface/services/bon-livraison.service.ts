import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BonDeLivraison } from '../models/bonDeLivraison';
@Injectable({
  providedIn: 'root'
})
export class BondeLivraisonService {
  private apiUrl = '/api/bon-commandes';
  private token = localStorage.getItem('token') || '';

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  constructor(private http: HttpClient) {}

  /** ➕ Créer une commande */
  createCommande(commande: BonDeLivraison): Observable<any> {
    return this.http.post(this.apiUrl, commande, { headers: this.headers });
  }
  getAll() {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }

  getById(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  update(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/${id}`, data, { headers: this.headers });
  }

  /** 🔍 Get by tracking */
  getByTracking(tracking: string): Observable<BonDeLivraison> {
    return this.http.get<BonDeLivraison>(`${this.apiUrl}/tracking/${tracking}`, { headers: this.headers });
  }

  /** 🧮 Calcul du total */
  calculerTotal(commande: BonDeLivraison): { montantTtc: number; total: number } {
    const montantTtc = commande.montantHt + (commande.montantHt * commande.tva / 100);
    const total = (montantTtc * commande.quantite) + commande.livraison;

    return { montantTtc, total };
  }
}
