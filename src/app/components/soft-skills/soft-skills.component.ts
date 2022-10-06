import { SoftSkill } from '../../models/request/SoftSkill';
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
            this.removeHabilidadesVazias();
            this.bloquearAlteracoesSoftSkill = Boolean(value);
            this.sessaoService.updateValue('SoftSkills', this.listaHabilidades);
        });
    }

    adicionarHabilidade() {
        this.listaHabilidades.push({ habilidade: '' });
    }

    removerHabilidade(index: number) {
        this.listaHabilidades.splice(index, 1);
    }

    ngOnDestroy(): void {
        this.subscricaoConfirmacao.unsubscribe();
    }

    onChangeSoftSkill() {
        if (!this.bloquearAlteracoesSoftSkill) {
            this.sessaoService.updateValue('SoftSkills', this.listaHabilidades);
        }
    }

    private removeHabilidadesVazias() {
        console.log('this.listaHabilidades antes', this.listaHabilidades);
        
        this.listaHabilidades = this.listaHabilidades.filter(value => { return value.habilidade; });
        console.log('this.listaHabilidades depois', this.listaHabilidades);
    }

}
