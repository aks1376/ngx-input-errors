# Description
ngx-input-errors library implement for angular Reactive Form to help us automatic extract and print input validation error messages. we can write multi language with custom error messages for form validations and our custom validations. 

it would help us to  
- write our error message once
- we don't worry about handling error messages
- write our custom message
- for change error messages we just need to change it in config error messages 

## Installation And Setup
install `ngx-input-errors` from `npm`: 
```
npm i ngx-input-errors
```
then import module to ngModule

and setup configuration

> Note: in this module you can write your own messages with different languages and custom validation message

```typescript
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
  },
  myLanguage: {
      defaultMessage: (displayName) => `my default message`,
      myDefaultValidation: (displayName, errors) => `my default error message`
  }
};

@NgModule({
  ...
  imports: [
      NgxInputErrorsModule.forRoot({defaultLanguage: 'fa', errorMessages}),
      ...]
  ...
})
export class AppModule {}
```

>Note: property `defaultMessage` is required for any language you add

>Tip: it's better to write your error message configuration in different file.

### Feature Modules
for feature module you just need to import `ngxInputErrorModule` in your feature or lazy module

## API

Inputs | Type | Implementation | Description
------ | ---- | --- | ------------
ngxInputErrors | directive | required |add this to your element like 'div', 'p', 'mat-error'
[form] | FormGroup | required | for every input you should bind form
[controlName] | string | required | name of the formControlName
[displayName] | string | required | the name you want display in error message
[language] | string | Optional | specify which language you want an error show. its priority is higher than default language

## Usage
`ngxInputErrors` is an angular directive.
you need to add `ngxInputErrors` as directive and bind properties required for it.

### Create Our Forms
```javascript
export class UserComponent {

  form: FormGroup = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
  });

  nestedForm: FormGroup = this.fb.group({
    street: ['', [Validators.required, Validators.maxLength(10)]],
    city: ['', [Validators.required, Validators.maxLength(10)]]
  });

  matForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    address: this.nestedForm
  });

  constructor(private fb: FormBuilder) {}
}
```

### Simple Input
```javascript
// In html file
<form [formGroup]="form">
  <input type="text" formControlName="firstName" placeholder="first name">
  <div ngxInputErrors [form]="form" controlName="firstName" displayName="first name"
    *ngIf="form.get('firstName').touched"></div>
</form>
```

### Mat Form Field
If you use Angular material design
```javascript
<form [formGroup]="matForm" (ngSubmit)="matSubmit()">
  <mat-form-field>
    <mat-label>Email</mat-label>
    <input matInput formControlName="email" placeholder="Email">
    <mat-error ngxInputErrors [form]="matForm" controlName="email" displayName="email" language="en"></mat-error>
  </mat-form-field>
</form>
```

>Note: for material design instead of simple input you don't need to add `*ngIf` directive to `<mat-error></mat-error>` for checking if input is touched. 


>Tip: if you have nested form, separate it to two property then bind nested form.