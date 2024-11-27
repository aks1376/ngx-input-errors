# Description

The ngx-input-errors project is developed for Angular Reactive Forms to easily display input validation error messages. This library supports multiple languages and allows for custom error messages for both standard form validations and user-defined validations.

## Features

- handles form validation error messages
- Supports multiple languages
- Customizable error messages for both Angular built-in and user-defined validations
- Easy integration with Angular Reactive Forms

## Demo

See [Demo](https://aks1376.github.io/ngx-input-errors-sample/)

## Installation

Install `ngx-input-errors` from `npm` : 

``` 
npm i ngx-input-errors
```

## Configuration

### Create Error Messages Config File

``` typescript
// ngx-input-errors-config.ts

export const errorMessages = {
  en: {
    defaultMessage: (displayName) => `${displayName} is not valid` ,
    required: (displayName: string) => `${displayName} is required` ,
    maxlength: (displayName: string, errors) => `${displayName} max length is: ${errors.maxlength.requiredLength}` ,
    minlength: (displayName: string, errors) => `${displayName} min length is: ${errors.minlength.requiredLength}` ,
    max: (displayName: string, errors) => `${displayName} max value is: ${errors.max.max}` ,
    min: (displayName: string, errors) => `${displayName} min value is: ${errors.min.min}` ,
    email: (displayName: string) => `${displayName} is not valid`
  },

  persian: {
    defaultMessage: (displayName) => `مقدار {displayName} صحیح نمی باشد` ,
    required: (displayName: string) => `باید مقدار {displayName} پر شود` ,
    maxlength: (displayName: string, errors) => `بیشترین مقدار برای ${displayName} میتواند ${errors.maxlength.requiredLength} باشد` ,
    minlength: (displayName: string, errors) => `کمترین مقدار برای ${displayName} می تواند ${errors.minlength.requiredLength} باشد` ,
    email: (displayName) => `ساختار ${displayName} شما معتبر نمی باشد`
  },

  myLanguage: {
    defaultMessage: (displayName) => `my default message` ,
    myDefaultValidation: (displayName, errors) => `my default error message`
  },
}
```

> Note: `defaultMessage` property is required for any language

### Config messages

To provide error messages in app config, import `provideNgxInputErrorMessages` from `ngx-input-errors`

``` typescript
import { ApplicationConfig } from '@angular/core';
import { provideNgxInputErrorMessages } from 'ngx-input-errors';
import { errorMessages } from './config/ngx-input-errors-messages';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNgxInputErrorMessages({
      defaultLanguage: 'en',
      errorMessages: errorMessages 
      }),
      ...
      ]
}

```

## API

| Inputs         | Type      | Implementation | Description                                                                         |
|----------------|-----------|----------------|-------------------------------------------------------------------------------------|
| ngxInputErrors | directive | required       | add this as directive to your element like 'div', 'p', 'mat-error'                  |
| [form]         | FormGroup | required       | defined FormGroup                                                                   |
| [controlName]  | string    | required       | name of the formControlName of input                                                |
| [displayName]  | string    | required       | the name display in error message                                                   |
| [language]     | string    | Optional       | to set display error message in different language instead of default language to   |

## Usage

### Create Forms

Create form and setup initial value and Validators

``` typescript
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: true,
  imports: [
    NgxInputErrors,
    ...
  ]
})
export class UserComponent {

    userForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        phone: [null, [Validators.required]]
    })

    constructor(private fb: FormBuilder) {}
}
```

### Add ngxInputErrors To Template

``` HTML
<form [formGroup]="userForm">

    <mat-form-field style="text-align: right;" dir="rtl">
        <mat-label>نام</mat-label>
        <input matInput type="text" formControlName="name" placeholder="نام">
        <mat-error ngxInputErrors [form]="userForm" controlName="name" displayName="نام" language="persian"></mat-error>
    </mat-form-field>

    <mat-form-field>
        <mat-label>Age</mat-label>
        <input matInput type="number" formControlName="age" placeholder="Age">
        <mat-error ngxInputErrors [form]="userForm" controlName="age" displayName="age"></mat-error>
    </mat-form-field>

    <mat-form-field>
        <mat-label>Email</mat-label>
        <input matInput type="email" formControlName="email" placeholder="Email">
        <mat-error ngxInputErrors [form]="userForm" controlName="email" displayName="email"></mat-error>
    </mat-form-field>

    <mat-form-field>
        <mat-label>Address</mat-label>
        <input matInput type="text" formControlName="address" placeholder="Address">
        <mat-error ngxInputErrors [form]="userForm" controlName="address" displayName="address"></mat-error>
    </mat-form-field>

    <mat-form-field>
        <mat-label>Phone</mat-label>
        <input matInput type="tel" formControlName="phone" placeholder="Phone">
        <mat-error ngxInputErrors [form]="userForm" controlName="phone" displayName="phone"></mat-error>
    </mat-form-field>

    <button mat-raised-button type="submit" color="primary">REGISTER</button>
</form>
```

>Note: `ngxInputErrors` support `language` optional attribute to display error in other defined languages in error messages config file

### Simple Input

``` HTML
<form [formGroup]="userForm">
  <input type="text" formControlName="name" placeholder="name">
  @if(userForm.get('name').touched) {
    <div ngxInputErrors [form]="userForm" controlName="name" displayName="name"></div>
  }
</form>
```
>Note: Add `userForm.get(name).touched` condition to prevent display error messages until user touch the input

### Angular Material Form Field

``` HTML
<form [formGroup]="userForm">
  <mat-form-field>
    <mat-label> Email </mat-label>
    <input matInput formControlName="email" placeholder="Email" />
    <mat-error ngxInputErrors [form]="userForm" controlName="email" displayName="email"></mat-error>
  </mat-form-field>
</form>
```

## Nested Form

Create new FormGroup for nested form

``` typescript
nestedAddressForm: FormGroup = this.fb.group({
  country: ['', [Validators.required]],
  city: ['', [Validators.required]],
  street: ['', [Validators.required]],
  telephone: [null, [Validators.required]]
})

userForm: FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
  address: this.nestedAddressForm
})
```

Use nested form for `ngxInputErrors` directive

``` html
<form [formGroup]="userForm">

  <mat-form-field>
    <mat-label>Name</mat-label>
    <input matInput formControlName="name" placeholder="name">
    <mat-error ngxInputErrors [form]="userForm" controlName="name" displayName="name"></mat-error>
  </mat-form-field>

  <div formGroupName="address">

    <mat-form-field>
      <mat-label>Country</mat-label>
      <input matInput formControlName="country" placeholder="country">
      <mat-error ngxInputErrors [form]="nestedAddressForm" controlName="country" displayName="country"></mat-error>
    </mat-form-field>

    <mat-form-field>
      <mat-label>City</mat-label>
      <input matInput formControlName="city" placeholder="city">
      <mat-error ngxInputErrors [form]="nestedAddressForm" controlName="city" displayName="city"></mat-error>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Street</mat-label>
      <input matInput formControlName="street" placeholder="street">
      <mat-error ngxInputErrors [form]="nestedAddressForm" controlName="street" displayName="street"></mat-error>
    </mat-form-field>

    <mat-form-field>
      <mat-label>Telephone</mat-label>
      <input matInput type="tel" formControlName="telephone" placeholder="telephone">
      <mat-error ngxInputErrors [form]="nestedAddressForm" controlName="telephone" displayName="telephone"></mat-error>
    </mat-form-field>

  </div>
</form>
```

>Note: In this sample, bind `nestedAddressForm` property not `address` form property