import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bootstrap-form',
  templateUrl: './bootstrap-form.component.html',
  styleUrls: ['./bootstrap-form.component.scss']
})
export class BootstrapFormComponent {

  addressForm: FormGroup = this.fb.group({
    country: ['', [Validators.required, Validators.maxLength(10)]],
    city: ['', [Validators.required, Validators.maxLength(10)]],
    street: ['', [Validators.required, Validators.maxLength(10)]],
  });

  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    family: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    telephone: [0, [Validators.required, Validators.min(6), Validators.max(24)]],
    address: this.addressForm
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() { }
}
