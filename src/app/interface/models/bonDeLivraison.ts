export interface BonDeLivraison {
  nom: string;
  prenom: string;
  telephone: string;
  gouvernorat: { name: string; code: string } | null;
  adresse: string;
  designation: string;
  quantite: number;
  montantHt: number;
  tva: number;
  montantTtc?: number;
  livraison: number;
  poids: string;
  total?: number;
}