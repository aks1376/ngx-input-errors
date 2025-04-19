import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxInputErrors } from 'projects/ngx-input-errors/src/input-errors.directive';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    NgxInputErrors,
    MatInputModule
  ]
})
export class MaterialFormComponent {

  private fb = inject(FormBuilder);

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

  onSubmit() { }

}
