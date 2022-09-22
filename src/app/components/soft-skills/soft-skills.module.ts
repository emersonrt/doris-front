import { InfoRetornarIframeModule } from './../info-retornar-iframe/info-retornar-iframe.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoftSkillsComponent } from './soft-skills.component';



@NgModule({
    declarations: [
        SoftSkillsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        InfoRetornarIframeModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoftSkillsModule { }
