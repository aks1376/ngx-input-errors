import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    lastName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    age: [0, [Validators.required, Validators.min(6), Validators.max(24)]],
    description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
