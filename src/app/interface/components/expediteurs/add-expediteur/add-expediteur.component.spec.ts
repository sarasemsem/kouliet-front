import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpediteurComponent } from './add-expediteur.component';

describe('AddExpediteurComponent', () => {
  let component: AddExpediteurComponent;
  let fixture: ComponentFixture<AddExpediteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpediteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExpediteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
