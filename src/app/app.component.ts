import { HardSkill } from 'src/app/models/HardSkill';
import { CandidatoPreRequest } from './models/request/CandidatoPreRequest';
import { ContextoSessaoService } from './services/contexto-sessao/contexto-sessao.service';
import { CandidatoService } from './services/candidato/candidato.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

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
            this.atualizaDadosNaSessao(result?.detail);

            // this.candidatoService.cadastrar(
            //     {
            //         nome: result?.detail.Nome_do_candidato,
            //         email: result?.detail.Email.value
            //     } as CandidatoRequest
            // ).subscribe({
            //     next: (response) => {
            //         console.log('sucesso:', response);
            //     },
            //     error: (error) => {
            //         console.log('error:', error);
            //     }
            // });
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

    atualizaDadosNaSessao(dados: any) {
        let hardsSkills: HardSkill[] = this.sessaoService.getValue('HardSkills');
        let softSkills: string[] = this.sessaoService.getValue('SoftSkills');

        this.sessaoService.updateValue('DadosCandidato', {
            nome: dados.Nome_do_candidato?.value,
            dataNascimento: dados.Data_de_nascimento?.value,
            email: dados.Email?.value,
            telefoneCelular: dados.Telefone_celular?.value,
            hardSkills: hardsSkills,
            softSkills: softSkills
        } as CandidatoPreRequest);

        this.sessaoService.updateValue('HardSkillsConfirmado', dados.Confirmar_hard_skills);
        this.sessaoService.updateValue('SoftSkillsConfirmado', dados.Confirmar_soft_skills);

        console.log('dados candidato', this.sessaoService.getValue('DadosCandidato'));
    }

    ngOnDestroy() {
        this.dataFromDorisEvent.unsubscribe();
        this.sessaoService.clearAllStorage();
    }

}
