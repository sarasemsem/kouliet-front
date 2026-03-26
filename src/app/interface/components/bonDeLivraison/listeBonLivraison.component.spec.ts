import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonDeLivraisonComponent } from './listeBonLivraison.component';

describe('CommandeComponent', () => {
  let component: BonDeLivraisonComponent;
  let fixture: ComponentFixture<BonDeLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonDeLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BonDeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
