import { SoftSkillsModule } from './components/soft-skills/soft-skills.module';
import { HardSkillsModule } from './components/hard-skills/hard-skills.module';
import { CadastroCandidatoModule } from './views/cadastro-candidato/cadastro-candidato.module';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TesteComponent } from './components/teste/teste.component';
import { MatSelectModule } from '@angular/material/select';
import { CadastroCandidatoComponent } from './views/cadastro-candidato/cadastro-candidato.component';
import { TesteModule } from './components/teste/teste.module';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        CadastroCandidatoModule,
        TesteModule,
        HardSkillsModule,
        SoftSkillsModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
