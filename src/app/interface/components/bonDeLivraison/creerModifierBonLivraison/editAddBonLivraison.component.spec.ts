import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddBonLivraisonComponent } from './editAddBonLivraison.component';

describe('CommandeComponent', () => {
  let component: EditAddBonLivraisonComponent;
  let fixture: ComponentFixture<EditAddBonLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAddBonLivraisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAddBonLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
