# Description

The ngx-input-errors library provides dynamic error messages for Angular Forms validations and automatic error extraction for displaying error messages.

This library supports the localization of error messages and custom error messages.

Features include:

* Setting up our custom error messages only once per app
* It does automatic handling of error messages for us
* Ability to set up custom error messages
* Changing default error messages of Angular once to apply to the entire app

## Demo

visit [Demo](https://stackblitz.com/github/aks1376/ngx-input-errors-sample)

## Installation And Setup

Install `ngx-input-errors` from `npm` : 

``` 
npm i ngx-input-errors
```

## Configuration

### Config File

Create `ngx-input-errors-config.ts ` configuration file (or any name you like).

then add your error messages

``` typescript
export const errorMessages = {
  en: {
    defaultMessage: (displayName) => `${displayName} is not valid` ,
    required: (displayName: string) => `${displayName} is required` ,
    maxlength: (displayName: string, errors) => `${displayName} max length is: ${errors.maxlength.requiredLength}` ,
    minlength: (displayName: string, errors) => `${displayName} min length is: ${errors.minlength.requiredLength}` ,
    max: (displayName: string, errors) => `${displayName} max value is: ${errors.max.max}` ,
    min: (displayName: string, errors) => `${displayName} min value is: ${errors.min.min}` ,
    email: (displayName) => `${displayName} is not valid`
  },

  fa: {
    defaultMessage: (displayName) => `مقدار{displayName}  صحیح نمی باشد` ,
    required: (displayName: string) => `باید مقدار  {displayName} پر شود` ,
    maxlength: (displayName: string, errors) => `بیشترین  مقدار برای ${displayName} میتواند ${errors.maxlength.requiredLength} باشد` ,
    minlength: (displayName: string, errors) => `کمترین   مقدار برای ${displayName} می تواند ${errors.minlength.requiredLength} باشد` ,
    email: (displayName) => `ساختار ${displayName}شما  معتبر نمی باشد`
  },

  myLanguage: {
    defaultMessage: (displayName) => `my default message` ,
    myDefaultValidation: (displayName, errors) => `my default error message`
  },
};
```

> Note: Property `defaultMessage` is required for any language you add.

### Config Module

Import `NgxInputErrorsModule` from ` ngx-input-errors` to your app module
then add your configuration to module

``` typescript
import { NgxInputErrorsModule } from 'ngx-input-errors';

// import error messages from where ever you create config file
// then add it in NgxInputErrorsModule
import { errorMessages } from './config/config-ngx-input-errors';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    NgxInputErrorsModule.forRoot({
      defaultLanguage: 'en',
      errorMessages
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Feature Modules

For feature module you just need to import `ngxInputErrorModule` in your feature or lazy module

``` typescript
import { NgxInputErrorsModule } from 'ngx-input-errors';

@NgModule({
  ...
  imports: [
    ...
    NgxInputErrorsModule
  ]
})
export class FeatureModule { }
```

## API

| Inputs         | Type      | Implementation | Description                                                                         |
|----------------|-----------|----------------|-------------------------------------------------------------------------------------|
| ngxInputErrors | directive | required       | add this as directive to your element like 'div', 'p', 'mat-error'                  |
| [form]         | FormGroup | required       | the form that you want to extract error                                             |
| [controlName]  | string    | required       | name of the formControlName of input                                                |
| [displayName]  | string    | required       | the name you want display in error message                                          |
| [language]     | string    | Optional       | you can set different language instead of default language to display error message |

## Usage

`ngxInputErrors` is an angular directive.
you need to add `ngxInputErrors` to your element and bind properties required for it.

### Create Our Forms

First create our form and setup initial value and Validators

``` typescript
export class UserComponent {

    userForm: FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        phone: [null, [Validators.required]]
    });

    constructor(private fb: FormBuilder) {}
}
```

### Add ngxInputErrors To Template

``` HTML
    <form [formGroup]="userForm">

        <mat-form-field style="text-align: right;" dir="rtl">
            <mat-label>نام</mat-label>
            <input matInput type="text" formControlName="name" placeholder="نام">
            <mat-error ngxInputErrors [form]="userForm" controlName="name" displayName="نام" language="fa"></mat-error>
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

>Note: If you want to use another language instead of default, you need to bind `language` property.
in first input i want show `Farsi` error message so i added `language="fa"`

### Simple Input

For simple input you just need to add `ngxInputErrors` directive to your element then bind its properties 

``` HTML
<form [formGroup]="userForm">
    <input type="text" formControlName="name" placeholder="name">
    <div ngxInputErrors [form]="userForm" controlName="name" displayName="name" *ngIf="userForm.get('name').touched"></div>
</form>
```

> Note: For our sample code we don't want error message display until user touch the input element so we added `*ngIf="userForm.get(name).touched"` to handle it

### Mat Form Field

If you use Angular material design

``` HTML
<form [formGroup]="userForm">
    <mat-form-field>
        <mat-label> Email </mat-label>
        <input matInput formControlName="email" placeholder="Email" />
        <mat-error ngxInputErrors [form]="userForm" controlName="email" displayName="email"></mat-error>
    </mat-form-field>
</form>
```

> Note: For material design instead of simple input you don't need to add `*ngIf` directive to `<mat-error></mat-error>` for checking if input element is touched. 

## Nested Form

for nested form you just need to separate the nested form from your main form

In component

``` typescript
  addressForm: FormGroup = this.fb.group({
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    telephone: [null, [Validators.required]]
  });
  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    address: this.addressForm
  });
```

In html 

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
            <mat-error ngxInputErrors [form]="addressForm" controlName="country" displayName="country"></mat-error>
        </mat-form-field>

        <mat-form-field>
            <mat-label>City</mat-label>
            <input matInput formControlName="city" placeholder="city">
            <mat-error ngxInputErrors [form]="addressForm" controlName="city" displayName="city"></mat-error>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Street</mat-label>
            <input matInput formControlName="street" placeholder="street">
            <mat-error ngxInputErrors [form]="addressForm" controlName="street" displayName="street"></mat-error>
        </mat-form-field>

        <mat-form-field>
            <mat-label>Telephone</mat-label>
            <input matInput type="tel" formControlName="telephone" placeholder="telephone">
            <mat-error ngxInputErrors [form]="addressForm" controlName="telephone" displayName="telephone"></mat-error>
        </mat-form-field>

    </div>
</form>
```

> Note: In nested form in template you should bind `formControlName` to `formGroupName` . in our sample we bind `address` to `formGroupName` not `addressForm`
