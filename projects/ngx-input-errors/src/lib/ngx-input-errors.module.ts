import { NgModule } from '@angular/core';
import { InputErrorsDirective } from './input-errors.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InputErrorsDirective],
  imports: [
    FormsModule,
  ],
  exports: [InputErrorsDirective]
})
export class NgxInputErrorsModule { }
