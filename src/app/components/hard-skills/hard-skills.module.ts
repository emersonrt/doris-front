import { InfoRetornarIframeModule } from './../info-retornar-iframe/info-retornar-iframe.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HardSkillsComponent } from './hard-skills.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        HardSkillsComponent
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
export class HardSkillsModule { }
