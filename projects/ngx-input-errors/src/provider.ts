import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

export class ErrorMessages {
  defaultLanguage!: string
  errorMessages!: {
    [language: string]: {
      [error: string]: any
    }
  }
}

export function provideNgxInputErrorMessages(config: ErrorMessages): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: ErrorMessages, useValue: config }
  ])
}