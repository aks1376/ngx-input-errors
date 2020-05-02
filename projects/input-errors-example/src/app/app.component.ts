import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'input-errors-example';

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    age: [0, [Validators.required, Validators.min(6), Validators.max(24)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
  });


  nestedForm: FormGroup = this.fb.group({
    street: ['', [Validators.required, Validators.maxLength(10)]],
    city: ['', [Validators.required, Validators.maxLength(10)]]
  });

  matForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    address: this.nestedForm
  });

  constructor(private fb: FormBuilder) { }

  submit() {
    console.log('form: ', this.form);
  }

  matSubmit() {
    console.log('mat form: ', this.matForm);
  }
}
