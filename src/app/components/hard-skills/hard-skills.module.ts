import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HardSkillsComponent } from './hard-skills.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
    declarations: [
        HardSkillsComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ]
})
export class HardSkillsModule { }
