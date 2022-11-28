import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxInputErrorsModule } from 'projects/ngx-input-errors/src/public-api';

import { AppComponent } from './app.component';
import { UserRegistryComponent } from './home/user-registry/user-registry.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from './home/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';

import { errorMessages } from './config/ngx-input-errors-messages';
import { BootstrapFormComponent } from './home/user-registry/bootstrap-form/bootstrap-form.component';
import { MaterialFormComponent } from './home/user-registry/material-form/material-form.component';

const materials = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistryComponent,
    HeaderComponent,
    BootstrapFormComponent,
    MaterialFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ...materials,
    NgxInputErrorsModule.forRoot({ defaultLanguage: 'en', errorMessages }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
