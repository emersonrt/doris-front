import { SoftSkill } from './../../models/SoftSkill';
import { ContextoSessaoService } from './../../services/contexto-sessao/contexto-sessao.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-soft-skills',
    templateUrl: './soft-skills.component.html',
    styleUrls: ['./soft-skills.component.scss']
})
export class SoftSkillsComponent implements OnInit {

    listaHabilidades: SoftSkill[] = [{ habilidade: '' }];
    bloquearAlteracoesSoftSkill: boolean = false;
    subscricaoConfirmacao: Subscription = new Subscription();

    constructor(private sessaoService: ContextoSessaoService) { }

    ngOnInit(): void {
        this.listaHabilidades = this.sessaoService.getValue('SoftSkills') || this.listaHabilidades;
        this.bloquearAlteracoesSoftSkill = this.sessaoService.getValue('SoftSkillsConfirmado') || false;
        this.subscricaoConfirmacao = this.sessaoService.watchvalue('SoftSkillsConfirmado').subscribe(value => {
            this.bloquearAlteracoesSoftSkill = Boolean(value);
        });
    }

    adicionarHabilidade() {
        this.listaHabilidades.push({ habilidade: '' });
    }

    ngOnDestroy(): void {
        this.subscricaoConfirmacao.unsubscribe();
    }

    onChangeSoftSkill() {
        if (!this.bloquearAlteracoesSoftSkill) {
            this.listaHabilidades = this.listaHabilidades.filter(value => { return value; });
            this.sessaoService.updateValue('SoftSkills', this.listaHabilidades);
        }
    }

}
