import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxInputErrorsModule } from 'ngx-input-errors';

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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    NgxInputErrorsModule.forRoot({ defaultLanguage: 'fa', errorMessages }),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
