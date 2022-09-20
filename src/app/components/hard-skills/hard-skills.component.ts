import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Hardskill } from 'src/app/models/Hardskill';

@Component({
    selector: 'app-hard-skills',
    templateUrl: './hard-skills.component.html',
    styleUrls: ['./hard-skills.component.scss']
})
export class HardSkillsComponent implements OnInit {

    listaHabilidades: Hardskill[] = [{ habilidade: '', tempoExperiencia: 0 }];

    constructor() { }

    ngOnInit(): void {
        //puxar hardskills do contexto de sessão
    }

    adicionarHabilidade() {
        this.listaHabilidades.push({ habilidade: '', tempoExperiencia: 0 });
        //if liberar_alteracao_hardskill
        //emitir alteração nas hardskills
    }

}
