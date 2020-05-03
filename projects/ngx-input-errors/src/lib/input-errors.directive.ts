import { Directive, ElementRef, Input, HostBinding, Optional } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { LibConfig } from './lib-config';

@Directive({
  selector: '[ngxInputErrors]'
})
export class InputErrorsDirective {

  message = '';
  private errorMessages: { [key: string]: any };

  @Input() controlName: string;
  @Input() displayName = '';
  @Input() language: string;

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

  constructor(@Optional() private readonly config: LibConfig, private el: ElementRef<HTMLParagraphElement>) {
    this.configProps();
  }

  /**
   * config language and check error message is exist
   */
  configProps(): void {
    // if user doesn't set language, we use default language in module config
    if (!this.language) {
      if (!this.config.defaultLanguage) {
        throw new Error('you don\'t set default language for error messages ');
      }
      this.language = this.config.defaultLanguage;
    }

    if (this.config.errorMessages) {
      this.errorMessages = this.config.errorMessages;
    } else {
      throw new Error('error messages is not set');
    }
  }

  /**
   * check the form control state
   * @param formControl reactive form formControl
   */
  checkValidation(formControl): void {

    if (formControl.invalid && formControl.errors) {
      let message = '';
      const errors = formControl.errors;
      message = this.extractError(this.errorMessages, errors, this.language, this.displayName);
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
  extractError(errorMessages: { [language: string]: { [error: string]: any } }, errors, language: string, displayName: string): string {
    const messages = errorMessages[language];
    let error;
    if (!messages) {
      throw new Error(`unable to find language of ${language} in error messages`);
    }
    if (!messages.defaultMessage) {
      throw new Error(`default message property in ${language} is missing`);
    }
    /**
     * for example the key of errors is required
     * I get the required function from error message
     * and the pass display name and errors to required function
     * finally extract the message
     */
    Object.keys(errors).forEach(key => {
      const errorFunction = messages[key];
      error = errorFunction ? errorFunction(displayName, errors) : messages.defaultMessage(displayName);
    });
    return error;
  }

}
