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
            console.log('variaveis_salvas no app:', result?.detail);
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

            // this.sessaoService.updateValue('DadosCandidato', Mapper.fromDoris(dados, hardsSkills, softSkills));
            console.log('dados candidato', Mapper.fromDoris(dados, hardsSkills, softSkills));
            this.cadastrarCandidato(Mapper.fromDoris(dados, hardsSkills, softSkills));
        }

        this.expressaoDoris = this.getExpressaoDoris(dados.Emocao_doris);
        this.sessaoService.updateValue('HardSkillsConfirmado', dados.Confirmar_hard_skills);
        this.sessaoService.updateValue('SoftSkillsConfirmado', dados.Confirmar_soft_skills);
    }

    private getExpressaoDoris(dadosEmocao: any): EmocoesDoris {
        if (EmocoesDoris.hasOwnProperty(dadosEmocao)) {
            return EmocoesDoris[dadosEmocao as keyof typeof EmocoesDoris];
        }
        return EmocoesDoris.PADRAO;
    }

    private cadastrarCandidato(dadosCandidato: CandidatoRequest) {
        this.candidatoService.cadastrar(dadosCandidato).subscribe({
            next: (response) => {
                console.log('sucesso:', response);
                this.sessaoService.clearAllStorage();
            },
            error: (error) => {
                console.log('error:', error);
                this.sessaoService.clearAllStorage();
            }
        });
    }

    sendData() {
        console.log('t');
        const mock = {
            "nome": "Émerson",
            "dataNascimento": "1999-03-09",
            "email": "emersonrosateixeira@hotmail.com",
            "telefoneCelular": "51998567167",
            "formacoes": [
                {
                    "nomeInstituicao": "unisc",
                    "tipoGraduacao": "Licenciatura",
                    "nomeCurso": "asdsaads",
                    "dataInicio": "01/12/2016",
                    "dataTermino": "01/12/2025"
                }
            ],
            "linksRelevantes": [],
            "hardSkills": [
                {
                    "habilidade": "adsads",
                    "tempoExperiencia": 3
                }
            ],
            "cargaHoraria": "Turno integral",
            "turno": "Manhã e noite",
            "modalidadeTrabalho": "Remoto",
            "areaInteresse": "Desenvolvimento de Software",
            "idiomas": [
                {
                    "idioma": "Espanhol",
                    "nivelFluencia": "Avançado"
                }
            ],
            "certificacoes": [],
            "experiencias": [],
            "pontosFracos": "l"
        } as unknown as CandidatoRequest;
        this.cadastrarCandidato(mock);

    }

}


// {
//     "nome": "Émerson Rosa Teixeira",
//     "dataNascimento": "1999-03-09",
//     "email": "emersonrosateixeira@hotmail.com",
//     "telefoneCelular": "51998567167",
//     "formacoes": [
//         {
//             "nomeInstituicao": "Unisc",
//             "tipoGraduacao": "Bacharelado",
//             "nomeCurso": "Eng. da Comp",
//             "dataInicio": "01/01/2016",
//             "dataTermino": "01/12/2022"
//         }
//     ],
//     "linksRelevantes": [
//         "www.youtube.com"
//     ],
//     "hardSkills": [
//         {
//             "habilidade": "Java",
//             "tempoExperiencia": 3
//         },
//         {
//             "habilidade": "PHP",
//             "tempoExperiencia": 2
//         },
//         {
//             "habilidade": "Angular",
//             "tempoExperiencia": 1
//         },
//         {
//             "habilidade": "AngularJS",
//             "tempoExperiencia": 2
//         }
//     ],
//     "softSkills": [
//         {
//             "habilidade": "Comunicação"
//         },
//         {
//             "habilidade": "Resolução de Problemas"
//         }
//     ],
//     "cargaHoraria": "Turno integral",
//     "turno": "Manhã e tarde",
//     "modalidadeTrabalho": "Remoto ou Híbrido",
//     "cidadeResidencia": "Santa Cruz do Sul/RS",
//     "disponibilidadeRealocacao": true,
//     "areaInteresse": "Desenvolvimento de Software",
//     "idiomas": [
//         {
//             "idioma": "Inglês",
//             "nivelFluencia": "Proficiência operativa eficaz"
//         }
//     ],
//     "certificacoes": [
//         {
//             "nome": "Formação Java",
//             "organizacaoEmissora": "Alura",
//             "dataEmissao": "01/06/2022",
//             "urlCodigo": "https://docs.jboss.org/hibernate/core/3.6/reference/en-US/html/mapping.html#mapping-declaration-component"
//         }
//     ],
//     "experiencias": [
//         {
//             "empresaOrganizacao": "BRQ Digital Solutions",
//             "tituloCargo": "Programador Pleno",
//             "dataInicio": "01/11/2021",
//             "dataTermino": null,
//             "descricao": null
//         }
//     ],
//     "pontosFortes": "Determinação, teste",
//     "pontosFracos": null,
//     "informacaoRelevante": null
// }
