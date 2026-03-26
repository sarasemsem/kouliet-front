import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-expediteur',
  templateUrl: './add-expediteur.component.html',
  styleUrls: ['./add-expediteur.component.scss']
})
export class AddExpediteurComponent implements OnInit {

  expediteurForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.expediteurForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.expediteurForm.valid) {
      console.log(this.expediteurForm.value);
      // ici tu appelles ton backend
    }
  }
}
