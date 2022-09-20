import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-soft-skills',
    templateUrl: './soft-skills.component.html',
    styleUrls: ['./soft-skills.component.scss']
})
export class SoftSkillsComponent implements OnInit {

    listaHabilidades: string[] = [''];

    constructor() { }

    ngOnInit(): void {
        //puxar softskills do contexto de sessão
    }

    adicionarHabilidade() {
        this.listaHabilidades.push('');
        //if liberar_alteracao_softskill
        //emitir alteração nas softskills
    }

}
