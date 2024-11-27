import { Component } from '@angular/core';
import { BootstrapFormComponent } from './bootstrap-form/bootstrap-form.component';
import { MaterialFormComponent } from './material-form/material-form.component';

@Component({
  selector: 'app-user-registry',
  templateUrl: './user-registry.component.html',
  styleUrls: ['./user-registry.component.scss'],
  standalone: true,
  imports: [
    BootstrapFormComponent,
    MaterialFormComponent
  ]
})
export class UserRegistryComponent { }
