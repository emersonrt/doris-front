import { ContextoSessaoService } from './../../services/contexto-sessao/contexto-sessao.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HardSkill } from 'src/app/models/request/HardSkill';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-hard-skills',
    templateUrl: './hard-skills.component.html',
    styleUrls: ['./hard-skills.component.scss']
})
export class HardSkillsComponent implements OnInit, OnDestroy {

    listaHabilidades: HardSkill[] = [{ habilidade: '', tempoExperiencia: 0 }];
    bloquearAlteracoesHardSkill: boolean = false;
    subscricaoConfirmacao: Subscription = new Subscription();

    constructor(private sessaoService: ContextoSessaoService) { }

    ngOnInit(): void {
        this.listaHabilidades = this.sessaoService.getValue('HardSkills') || this.listaHabilidades;
        this.bloquearAlteracoesHardSkill = this.sessaoService.getValue('HardSkillsConfirmado') || false;
        this.subscricaoConfirmacao = this.sessaoService.watchvalue('HardSkillsConfirmado').subscribe(value => {
            this.bloquearAlteracoesHardSkill = Boolean(value);
        });
    }

    ngOnDestroy(): void {
        this.subscricaoConfirmacao.unsubscribe();
    }

    adicionarHabilidade() {
        this.listaHabilidades.push({ habilidade: '', tempoExperiencia: 0 });
    }

    onChangeHardSkill() {
        if (!this.bloquearAlteracoesHardSkill) {
            this.listaHabilidades = this.listaHabilidades.filter(value => { return value.habilidade; });
            this.sessaoService.updateValue('HardSkills', this.listaHabilidades);
        }
    }

}
