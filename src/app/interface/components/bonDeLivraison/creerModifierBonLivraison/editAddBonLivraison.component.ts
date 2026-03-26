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
  isView = false;
  bonLivraisonForm!: FormGroup;
  id: string | null = null;
  dropdownItems = [
    { name: 'Ariana', code: 'Ariana'},
    { name: 'Béja', code: 'Béja'},
    { name: 'Ben Arous', code: 'Ben Arous'},
    { name: 'Tunis', code: 'Tunis'},
  ];

  constructor(private service: MessageService,
    private fb: FormBuilder,
    private bonDeLivraisonService: BondeLivraisonService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();
    this.bonLivraisonForm.valueChanges.subscribe(() => {
      this.calculerMontants();
    });
    this.id = this.route.snapshot.paramMap.get('commandeId');
    if (this.id) {
      console.log('ID trouvé dans l\'URL :', this.id);
      this.mode = 'edit';
      this.loadCommandeFromApi(this.id);
    }
  
    if (this.mode === 'view') {
      this.bonLivraisonForm.disable();
    }
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
    this.bonLivraisonForm.disable();
  }
  loadCommandeFromApi(id: string) {
    this.bonDeLivraisonService.getById(id).subscribe({
      next: (data) => {
        this.bonLivraisonForm.patchValue({
          nom: data.nom,
          prenom: data.prenom,
          telephone: data.telephone,
          gouvernorat: this.dropdownItems.find(
            g => g.name === data.gouvernorat
          ),
          adresse: data.adresse,
          designation: data.designation,
          quantite: data.quantite,
          montantHt: data.montantHt,
          tva: data.tva,
          livraison: data.livraison,
          poids: data.poids
        });
      },
      error: err => {
        console.error('Erreur chargement bon livraison', err);
      }
    });
  }
  
calculerMontants() {
  const montantHt :number= this.bonLivraisonForm.get('montantHt')?.value || 0;
  const tva :number = this.bonLivraisonForm.get('tva')?.value || 0;
  const quantite :number  = this.bonLivraisonForm.get('quantite')?.value || 1;
  const livraison:number = this.bonLivraisonForm.get('livraison')?.value || 0;

  const montantTtc = montantHt + (montantHt * tva / 100);
  const total = (montantTtc * quantite) + livraison;

  this.bonLivraisonForm.patchValue(
    {
      montantTtc,
      total
    },
    { emitEvent: false }
  );
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
    this.bonDeLivraisonService.update(this.id!, payload).subscribe({
      next: () => {
        console.log('Commande modifiée');
        this.router.navigate(['/bon-livraison']);
      }
    });

  } else {
    this.bonDeLivraisonService.createCommande(payload).subscribe({
      next: () => {
        console.log('Commande créée');
        this.bonLivraisonForm.reset();  
        this.service.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });

        //this.router.navigate(['/bon-livraison']);
      }, 
      error: err => {
        this.service.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'There are unsaved changes' });
      }
    });
  }
}


  isViewMode(): boolean {
    return this.mode === 'view';
  }
  isEditMode() {
    this.bonLivraisonForm.enable();
    this.isView = false;
  }
}
