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

  constructor(@Optional() @SkipSelf() parentModule?: NgxInputErrorsModule) { }

  static forRoot(config: LibConfig): ModuleWithProviders<NgxInputErrorsModule> {
    return {
      ngModule: NgxInputErrorsModule,
      providers: [{ provide: LibConfig, useValue: config }]
    };
  }

  static forChild(): ModuleWithProviders<NgxInputErrorsModule> {
    return {
      ngModule: NgxInputErrorsModule
    };
  }
}
