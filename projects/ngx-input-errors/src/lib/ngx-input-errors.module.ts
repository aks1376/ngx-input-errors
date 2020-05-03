import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { InputErrorsDirective } from './input-errors.directive';
import { FormsModule } from '@angular/forms';
import { LibConfig } from './lib-config';

@NgModule({
  declarations: [InputErrorsDirective],
  imports: [
    FormsModule,
  ],
  exports: [InputErrorsDirective]
})
export class NgxInputErrorsModule {

  constructor(@Optional() @SkipSelf() parentModule?: NgxInputErrorsModule) {
    if (parentModule) {
      throw new Error(
        'NgxInputErrorsModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: LibConfig): ModuleWithProviders {
    return {
      ngModule: NgxInputErrorsModule,
      providers: [{ provide: LibConfig, useValue: config }]
    }
  }
}
