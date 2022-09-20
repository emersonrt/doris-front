import { TesteComponent } from './teste.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [TesteComponent],
    imports: [
        CommonModule,
        MatCheckboxModule,
        ReactiveFormsModule
    ],
    exports: [
        TesteComponent
    ]
})
export class TesteModule { }
