import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftSkillsComponent } from './soft-skills.component';



@NgModule({
    declarations: [
        SoftSkillsComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class SoftSkillsModule { }
