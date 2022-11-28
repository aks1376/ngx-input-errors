export class LibConfig {
    defaultLanguage!: string;
    errorMessages!: {
        [language: string]: {
            [error: string]: any
        }
    };
}
