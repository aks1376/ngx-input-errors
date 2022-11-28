export const errorMessages = {
  en: {
    defaultMessage: (displayName: string) => `${displayName} is not valid`,
    required: (displayName: string) => `${displayName} is required`,
    maxlength: (displayName: string, errors: any) => `${displayName} max length is: ${errors.maxlength.requiredLength}`,
    minlength: (displayName: string, errors: any) => `${displayName} min length is: ${errors.minlength.requiredLength}`,
    max: (displayName: string, errors: any) => `${displayName} max value is: ${errors.max.max}`,
    min: (displayName: string, errors: any) => `${displayName} min value is: ${errors.min.min}`,
    email: (displayName: string) => `${displayName} is not valid`
  },
  fa: {
    defaultMessage: (displayName: string) => `${displayName} معتبر نمی باشد`,
    required: (displayName: string) => `${displayName} حتما باید تکمیل شود`,
  }
};