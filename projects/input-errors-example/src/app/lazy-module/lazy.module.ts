import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInputComponent } from './user-input/user-input.component';
import { Routes, RouterModule } from '@angular/router';
import { NgxInputErrorsModule } from 'ngx-input-errors';
import { ReactiveFormsModule } from '@angular/forms';
import { LazyComponent } from './lazy/lazy.component';

const routes: Routes = [
    {path: '', component: LazyComponent, children: [
        {path: '', component: UserInputComponent}
    ]}
];

@NgModule({
    declarations: [UserInputComponent, LazyComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgxInputErrorsModule
    ],
    exports: [RouterModule],
    providers: []
})
export class LazyModule { }
