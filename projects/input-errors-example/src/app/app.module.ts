import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxInputErrorsModule } from 'ngx-input-errors';

import { RouterModule, Routes } from '@angular/router';
import { InputFormComponent } from './input-form/input-form.component';
import { UserInputComponent } from './lazy-module/user-input/user-input.component';

const errorMessages = {
  en: {
    defaultMessage: (displayName) => `${displayName} is not valid`,
    required: (displayName: string) => `${displayName} is required`,
    maxlength: (displayName: string, errors) => `${displayName} max length is: ${errors.maxlength.requiredLength}`,
    minlength: (displayName: string, errors) => `${displayName} min length is: ${errors.minlength.requiredLength}`,
    max: (displayName: string, errors) => `${displayName} max value is: ${errors.max.max}`,
    min: (displayName: string, errors) => `${displayName} min value is: ${errors.min.min}`,
    email: (displayName) => `${displayName} is not valid`
  },
  fa: {
    defaultMessage: (displayName) => `${displayName} معتبر نمی باشد`,
    required: (displayName: string) => `${displayName} حتما باید تکمیل شود`,
  }
};

const routes: Routes = [
  {
    path: '', component: AppComponent, children: [
      { path: '', component: InputFormComponent }
    ]
  },
  { path: 'fm', loadChildren: () => import('./lazy-module/lazy.module').then(mod => mod.LazyModule) }
];

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxInputErrorsModule.forRoot({ defaultLanguage: 'fa', errorMessages }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
