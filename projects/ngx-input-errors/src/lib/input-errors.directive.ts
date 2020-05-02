import { Directive, ElementRef, Input, HostBinding } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[ngxInputErrors]'
})
export class InputErrorsDirective {

  message = '';

  @Input() controlName;
  @Input() displayName = '';
  @Input() language = 'en';

  @Input('form') set form(form: FormGroup) {
    const formControl = form.get(this.controlName);

    /**
     * check first validation when form control initialize
     */
    this.checkValidation(formControl);

    formControl.statusChanges.subscribe(value => {
      this.checkValidation(formControl);
    });
  }

  @HostBinding('class.invalid') inValid: boolean;

  errorMessages: { [key: string]: any } = {
    en: {
      required: (displayName: string) => `${displayName} is required`,
      maxlength: (displayName: string, errors) => `${displayName} max length is: ${errors.maxlength.requiredLength}`,
      minlength: (displayName: string, errors) => `${displayName} min length is: ${errors.minlength.requiredLength}`,
      max: (displayName: string, errors) => `${displayName} max value is: ${errors.max.max}`,
      min: (displayName: string, errors) => `${displayName} min value is: ${errors.min.min}`,
      email: (displayName) => `${displayName} is not valid`
    }
  };

  constructor(private el: ElementRef<HTMLParagraphElement>) { }

  /**
   * check the form control state
   * @param formControl reactive form formControl
   */
  checkValidation(formControl) {
    if (formControl.invalid && formControl.errors) {
      let message = '';
      const errors = formControl.errors;
      message = this.extractError(this.errorMessages, errors, this.language, this.displayName);
      message = message ? message : `${this.displayName} is not valid`;
      this.message = message;
      this.el.nativeElement.innerText = message;
      this.inValid = true;
    } else {
      this.el.nativeElement.innerText = '';
      this.message = '';
      this.inValid = false;
    }
  }

  /**
   * this function extract the reactive form validation errors from our custom error message with different languages
   * @param errorMessages the error messages object is for define our showing user input error
   * @param errors the value of errors in input object that define in form
   * @param language the language of the error that we want to extract
   * @param displayName the display input name for user
   */
  extractError(errorMessages: { [key: string]: string }, errors, language: string, displayName: string): string {
    const messages = errorMessages[language];
    let error;
    if (!messages) {
      throw new Error(`unable to find language of ${language} in error messages`);
    }
    /**
     * for example the key of errors is required
     * I get the required function from error message
     * and the pass display name and errors to required function
     * finally extract the message
     */
    Object.keys(errors).forEach(key => {
      const errorFunction = messages[key];
      if (errorFunction) {
        error = errorFunction(displayName, errors);
      }
    });
    return error;
  }

}
