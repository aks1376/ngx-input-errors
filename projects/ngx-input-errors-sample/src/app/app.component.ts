import { Component } from '@angular/core';
import { HeaderComponent } from './home/header/header.component';
import { UserRegistryComponent } from './home/user-registry/user-registry.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    UserRegistryComponent,
    HeaderComponent
  ]
})
export class AppComponent { }
