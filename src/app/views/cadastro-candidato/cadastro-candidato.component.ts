import { Component, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Mapper } from 'src/app/models/Mapper';
import { CandidatoRequest } from 'src/app/models/request/CandidatoRequest';
import { HardSkill } from 'src/app/models/request/HardSkill';
import { SoftSkill } from 'src/app/models/request/SoftSkill';
import { CandidatoService } from 'src/app/services/candidato/candidato.service';
import { ContextoSessaoService } from 'src/app/services/contexto-sessao/contexto-sessao.service';
import { EmocoesDoris } from 'src/app/utils/emocoes-doris/emocoes-doris';

@Component({
    selector: 'app-cadastro-candidato',
    templateUrl: './cadastro-candidato.component.html',
    styleUrls: ['./cadastro-candidato.component.scss']
})
export class CadastroCandidatoComponent implements OnInit, OnDestroy {

    dataFromDorisEvent: Subscription = new Subscription();
    dadosCandidato: Subscription = new Subscription();
    expressaoDoris: EmocoesDoris = EmocoesDoris.PADRAO;

    constructor(
        private candidatoService: CandidatoService,
        private sessaoService: ContextoSessaoService
    ) { }

    ngOnInit(): void {
        this.dataFromDorisEvent = fromEvent(window, 'sendDataToAngular').subscribe((result: any) => {
            this.atualizaDadosSessao(result?.detail);
        });
    }

    ngOnDestroy() {
        this.dataFromDorisEvent.unsubscribe();
        this.sessaoService.clearAllStorage();
    }

    private atualizaDadosSessao(dados: any) {
        if (Boolean(JSON.parse(dados.Flag_finalizado))) {
            let hardsSkills: HardSkill[] = this.sessaoService.getValue('HardSkills');
            let softSkills: SoftSkill[] = this.sessaoService.getValue('SoftSkills');

            this.cadastrarCandidato(Mapper.fromDoris(dados, hardsSkills, softSkills));
        }

        this.wakeUpHeroku();
        this.expressaoDoris = this.getExpressaoDoris(dados.Emocao_doris);
        this.sessaoService.updateValue('HardSkillsConfirmado', dados.Confirmar_hard_skills);
        this.sessaoService.updateValue('SoftSkillsConfirmado', dados.Confirmar_soft_skills);
    }

    private wakeUpHeroku() {
        this.candidatoService.wakeUpHeroku().subscribe({
            next: value => { },
            error: err => { }
        });
    }

    private getExpressaoDoris(dadosEmocao: any): EmocoesDoris {
        if (EmocoesDoris.hasOwnProperty(dadosEmocao)) {
            return EmocoesDoris[dadosEmocao as keyof typeof EmocoesDoris];
        }
        return EmocoesDoris.PADRAO;
    }

    private cadastrarCandidato(dadosCandidato: CandidatoRequest) {
        this.sessaoService.clearAllStorage();
        this.candidatoService.cadastrar(dadosCandidato).subscribe({
            next: (response) => {
                console.log('sucesso:', response);
            },
            error: (error) => {
                console.log('error:', error);
            }
        });
    }

}