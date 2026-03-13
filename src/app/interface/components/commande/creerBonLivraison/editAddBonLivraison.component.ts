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
  commandeForm!: FormGroup;

  dropdownItems = [
    { name: 'Ariana', code: 'Ariana'},
    { name: 'Béja', code: 'Béja'},
    { name: 'Ben Arous', code: 'Ben Arous'},
    { name: 'Tunis', code: 'Tunis'},
  ];

  constructor(private service: MessageService,
    private fb: FormBuilder,
    private commandeService: BondeLivraisonService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  
    this.commandeForm.valueChanges.subscribe(() => {
      this.calculerMontants();
    });
  
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      this.mode = 'edit';
      this.loadCommandeFromApi(+id);
    }
  
    if (this.mode === 'view') {
      this.commandeForm.disable();
    }
  }  

  initForm() {
    this.commandeForm = this.fb.group({
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
  loadCommandeFromApi(id: number) {
    this.commandeService.getById(id).subscribe({
      next: (data) => {
        this.commandeForm.patchValue({
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
  
  loadCommande() {
    // Simulation data (API)
    const data = {
      nom: 'Ben Ali',
      prenom: 'Ahmed',
      telephone: '22123456',
      gouvernorat: this.dropdownItems[3],
      adresse: 'Tunis centre',
      designation: 'Article test',
      quantite: 2,
      montantHt: 100,
      tva: 19,
      livraison: 10,
      poids: '2kg'
    };

    this.commandeForm.patchValue(data);
  }
calculerMontants() {
  const montantHt = this.commandeForm.get('montantHt')?.value || 0;
  const tva = this.commandeForm.get('tva')?.value || 0;
  const quantite = this.commandeForm.get('quantite')?.value || 1;
  const livraison = this.commandeForm.get('livraison')?.value || 0;

  const montantTtc = montantHt + (montantHt * tva / 100);
  const total = (montantTtc * quantite) + livraison;

  this.commandeForm.patchValue(
    {
      montantTtc,
      total
    },
    { emitEvent: false }
  );
}

save() {
  if (this.commandeForm.invalid) return;

  const raw = this.commandeForm.getRawValue();

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
    const id = this.route.snapshot.paramMap.get('id');

    this.commandeService.update(+id!, payload).subscribe({
      next: () => {
        console.log('Commande modifiée');
        this.router.navigate(['/bon-livraison']);
      }
    });

  } else {
    this.commandeService.createCommande(payload).subscribe({
      next: () => {
        console.log('Commande créée');
        this.commandeForm.reset();  
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
}
