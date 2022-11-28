import { Directive, ElementRef, Input, HostBinding, Optional } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { LibConfig } from './lib-config';

@Directive({
  selector: '[ngxInputErrors]'
})
export class InputErrorsDirective {

  message = '';
  private errorMessages!: { [key: string]: any };

  @Input() controlName!: string;
  @Input() displayName = '';
  @Input() language!: string;

  @Input('form') set form(form: FormGroup) {
    const formControl = form.get(this.controlName);

    if(formControl) {
      /**
       * check first validation when form control initialize
       */
      this.checkFormControlValidation(formControl);
  
      formControl.statusChanges.subscribe(value => {
        this.checkFormControlValidation(formControl);
      });
    } else {
      throw new Error(`couldn\'t find form control name ${this.controlName}`);
    }
  }

  @HostBinding('class.invalid') inValid!: boolean;

  constructor(@Optional() private readonly config: LibConfig, private el: ElementRef<HTMLParagraphElement>) {
    this.initializeErrorMessageFromConfigFile();
  }

  /**
   * set error message language and
   * get error messages from config file
   */
  initializeErrorMessageFromConfigFile() {
    this.setErrorMessageLanguage();
    this.getErrorMessagesFromConfigFile();
  }

  /**
   * set error message language to display
   */
  setErrorMessageLanguage() {
    // if user didn't set language, we use default language in config file
    if (!this.language) {
      if (!this.config.defaultLanguage) {
        throw new Error('you didn\'t set default language for error messages in config file!');
      }
      this.language = this.config.defaultLanguage;
    }
  }

  getErrorMessagesFromConfigFile() {
    if (this.config.errorMessages) {
      this.errorMessages = this.config.errorMessages;
    } else {
      throw new Error('error messages is not set in config file');
    }
  }

  /**
   * check the form control state
   * @param formControl reactive form formControl
   */
  checkFormControlValidation(formControl: AbstractControl): void {
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
  extractError(errorMessages: { [language: string]: { [error: string]: any } }, errors: any, language: string, displayName: string): any {
    const messages = errorMessages[language];
    let error;
    if (!messages) {
      throw new Error(`unable to find language of ${language} in error messages`);
    }
    if (!messages['defaultMessage']) {
      throw new Error(`default message property in ${language} is missing`);
    }
    /**
     * for example the key of errors is required
     * I get the required function from error message
     * and the pass display name and errors to required function
     * finally extract the message
     */
    Object.keys(errors).forEach(key => {
      const errorMessage: Function = messages[key];
      error = errorMessage ? errorMessage(displayName, errors) : messages['defaultMessage'](displayName);
    });
    return error;
  }

}
