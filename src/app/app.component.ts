import { SoftSkill } from './models/request/SoftSkill';
import { HardSkill } from 'src/app/models/request/HardSkill';
import { ContextoSessaoService } from './services/contexto-sessao/contexto-sessao.service';
import { CandidatoService } from './services/candidato/candidato.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Mapper } from './models/Mapper';
import { CandidatoRequest } from './models/request/CandidatoRequest';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    dataFromDorisEvent: Subscription = new Subscription();
    dadosCandidato: Subscription = new Subscription();

    constructor(
        private candidatoService: CandidatoService,
        private sessaoService: ContextoSessaoService
    ) { }

    ngOnInit(): void {
        this.dataFromDorisEvent = fromEvent(window, 'sendDataToAngular').subscribe((result: any) => {
            console.log('variaveis_salvas no app:', result?.detail);
            this.atualizaDadosSessao(result?.detail);
        });

        // this.candidatoService.buscarTodos().subscribe({
        //     next: (response) => {
        //         console.log('sucesso:', response);
        //     },
        //     error: (error) => {
        //         console.log('error:', error);
        //     }
        // });
    }

    private atualizaDadosSessao(dados: any) {
        if (Boolean(JSON.parse(dados.Flag_finalizado))) {
            console.log('dados.Flag_finalizado', dados.Flag_finalizado);
            
            let hardsSkills: HardSkill[] = this.sessaoService.getValue('HardSkills');
            let softSkills: SoftSkill[] = this.sessaoService.getValue('SoftSkills');
            // this.sessaoService.updateValue('DadosCandidato', Mapper.fromDoris(dados, hardsSkills, softSkills));
            console.log('dados candidato', Mapper.fromDoris(dados, hardsSkills, softSkills));
            this.cadastrarCandidato(Mapper.fromDoris(dados, hardsSkills, softSkills));
        }

        this.sessaoService.updateValue('HardSkillsConfirmado', dados.Confirmar_hard_skills);
        this.sessaoService.updateValue('SoftSkillsConfirmado', dados.Confirmar_soft_skills);
    }

    private cadastrarCandidato(dadosCandidato: CandidatoRequest) {
        this.candidatoService.cadastrar(dadosCandidato).subscribe({
            next: (response) => {
                console.log('sucesso:', response);
            },
            error: (error) => {
                console.log('error:', error);
            }
        });
    }

    ngOnDestroy() {
        this.dataFromDorisEvent.unsubscribe();
        this.sessaoService.clearAllStorage();
    }

}
