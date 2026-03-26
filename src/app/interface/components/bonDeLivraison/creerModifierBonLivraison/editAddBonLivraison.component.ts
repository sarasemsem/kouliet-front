import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BondeLivraisonService } from 'src/app/interface/services/bon-livraison.service';

@Component({
  selector: 'app-commande',
  templateUrl: './editAddBonLivraison.component.html',
  styleUrls: ['./editAddBonLivraison.component.scss']
})
export class EditAddBonLivraisonComponent implements OnInit {

  mode: 'add' | 'edit' | 'view' = 'add'; 
  bonLivraisonForm!: FormGroup;
  id: string | null = null;

  dropdownItems = [
    { name: 'Ariana', code: 'Ariana'},
    { name: 'Béja', code: 'Béja'},
    { name: 'Ben Arous', code: 'Ben Arous'},
    { name: 'Tunis', code: 'Tunis'},
  ];

  constructor(
    private service: MessageService,
    private fb: FormBuilder,
    private bonDeLivraisonService: BondeLivraisonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.id = this.route.snapshot.paramMap.get('commandeId');

    if (this.id) {
      this.mode = 'view'; // par défaut si on a un ID
      this.loadCommandeFromApi(this.id);
      this.bonLivraisonForm.disable(); // désactive la form au départ
    } else {
      this.mode = 'add';
      this.bonLivraisonForm.enable(); // form active pour ajouter
    }

    this.bonLivraisonForm.valueChanges.subscribe(() => {
      this.calculerMontants();
    });
  }  

  get isViewMode(): boolean {
    return this.mode === 'view';
  }

  get isViewAddMode(): boolean {
    return this.mode === 'edit' || this.mode === 'view';
  }

  isEditMode() {
    this.mode = 'edit';
    this.bonLivraisonForm.enable(); // active la form
  }

  initForm() {
    this.bonLivraisonForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: [''],
      gouvernorat: [null],
      adresse: [''],
      designation: [''],
      quantite: [1],
      montantHt: [0],
      tva: [0],
      montantTtc: [{ value: 0, disabled: true }],
      livraison: [0],
      poids: [''],
      total: [{ value: 0, disabled: true }]
    });
  }

  loadCommandeFromApi(id: string) {
    this.bonDeLivraisonService.getById(id).subscribe({
      next: (data) => {
        this.bonLivraisonForm.patchValue({
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone,
          gouvernorat: this.dropdownItems.find(g => g.name === data.gouvernorat),
          adresse: data.adresse,
          designation: data.designation,
          quantite: data.quantite,
          montantHt: data.montantHt,
          tva: data.tva,
          livraison: data.livraison,
          poids: data.poids
        });
      },
      error: err => console.error('Erreur chargement bon livraison', err)
    });
  }

  calculerMontants() {
    const montantHt = this.bonLivraisonForm.get('montantHt')?.value || 0;
    const tva = this.bonLivraisonForm.get('tva')?.value || 0;
    const quantite = this.bonLivraisonForm.get('quantite')?.value || 1;
    const livraison = this.bonLivraisonForm.get('livraison')?.value || 0;

    const montantTtc = montantHt + (montantHt * tva / 100);
    const total = (montantTtc * quantite) + livraison;

    this.bonLivraisonForm.patchValue({ montantTtc, total }, { emitEvent: false });
  }

  save() {
    if (this.bonLivraisonForm.invalid) return;

    const raw = this.bonLivraisonForm.getRawValue();
    const payload = {
      nom: raw.nom,
      prenom: raw.prenom,
      telephone: raw.telephone,
      gouvernorat: raw.gouvernorat?.name,
      adresse: raw.adresse,
      designation: raw.designation,
      quantite: raw.quantite,
      montantHt: raw.montantHt,
      tva: raw.tva,
      montantTtc: raw.montantTtc,
      livraison: raw.livraison,
      poids: raw.poids,
      totalAPayer: raw.total
    };

    if (this.mode === 'edit') {
      this.bonDeLivraisonService.update(this.id!, payload).subscribe(() => {
        this.router.navigate(['/bon-livraison']);
      });
    } else {
      this.bonDeLivraisonService.createCommande(payload).subscribe(() => {
        this.bonLivraisonForm.reset();
        this.router.navigate(['/bon-livraison']);
      });
    }
  }
}