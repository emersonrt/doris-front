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

    sendData() {
        // const mock = {
        //     "nome": "Émerson",
        //     "dataNascimento": "1999-03-09",
        //     "email": "emersonrosateixeira@hotmail.com",
        //     "telefoneCelular": "51998567167",
        //     "formacoes": [
        //         {
        //             "nomeInstituicao": "unisc",
        //             "tipoGraduacao": "Licenciatura",
        //             "nomeCurso": "asdsaads",
        //             "dataInicio": "01/12/2016",
        //             "dataTermino": "01/12/2025"
        //         }
        //     ],
        //     "linksRelevantes": [],
        //     "hardSkills": [
        //         {
        //             "habilidade": "adsads",
        //             "tempoExperiencia": 3
        //         }
        //     ],
        //     "cargaHoraria": "Turno integral",
        //     "turno": "Manhã e noite",
        //     "modalidadeTrabalho": "Remoto",
        //     "areaInteresse": "Desenvolvimento de Software",
        //     "idiomas": [
        //         {
        //             "idioma": "Espanhol",
        //             "nivelFluencia": "Avançado"
        //         }
        //     ],
        //     "certificacoes": [],
        //     "experiencias": [],
        //     "pontosFracos": "l"
        // } as unknown as CandidatoRequest;
        // this.cadastrarCandidato(mock);

        // const mock2 = {
        //     "nome": "Ana Paula Klein",
        //     "dataNascimento": "1999-05-17",
        //     "email": "anap@hotmail.com",
        //     "telefoneCelular": "51998564456",
        //     "formacoes": [
        //         {
        //             "nomeInstituicao": "Unisc",
        //             "tipoGraduacao": "Licenciatura",
        //             "nomeCurso": "Teste",
        //             "dataInicio": "01/12/2016",
        //             "dataTermino": "01/12/2025"
        //         }
        //     ],
        //     "linksRelevantes": [],
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
        //     "turno": "Manhã e noite",
        //     "modalidadeTrabalho": "Remoto",
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
        //     ]
        // } as unknown as CandidatoRequest;
        // this.cadastrarCandidato(mock2);

        // const mock3 = {
        //     "nome": "Douglas T. Teste",
        //     "dataNascimento": "1988-05-17",
        //     "email": "doug@hotmail.com",
        //     "telefoneCelular": "51998564456",
        //     "formacoes": [
        //         {
        //             "nomeInstituicao": "Unisc",
        //             "tipoGraduacao": "Licenciatura",
        //             "nomeCurso": "Teste",
        //             "dataInicio": "01/12/2016",
        //             "dataTermino": "01/12/2025"
        //         }
        //     ],
        //     "linksRelevantes": [],
        //     "hardSkills": [
        //         {
        //             "habilidade": "Java",
        //             "tempoExperiencia": 3
        //         },
        //         {
        //             "habilidade": "PHP",
        //             "tempoExperiencia": 2
        //         }
        //     ],
        //     "softSkills": [
        //         {
        //             "habilidade": "Comunicação"
        //         }
        //     ],
        //     "cargaHoraria": "Turno integral",
        //     "turno": "Manhã e noite",
        //     "modalidadeTrabalho": "Remoto",
        //     "areaInteresse": "Desenvolvimento de Software",
        //     "idiomas": [
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
        //     ]
        // } as unknown as CandidatoRequest;
        // this.cadastrarCandidato(mock3);

        // const mock4 = {
        //     "nome": "Jon Snow",
        //     "dataNascimento": "1977-05-17",
        //     "email": "snowland@hotmail.com",
        //     "telefoneCelular": "51998566598",
        //     "formacoes": [
        //         {
        //             "nomeInstituicao": "Unisc",
        //             "tipoGraduacao": "Licenciatura",
        //             "nomeCurso": "Teste",
        //             "dataInicio": "01/12/2016",
        //             "dataTermino": "01/12/2025"
        //         }
        //     ],
        //     "linksRelevantes": [],
        //     "hardSkills": [
        //         {
        //             "habilidade": "PHP",
        //             "tempoExperiencia": 2
        //         }
        //     ],
        //     "softSkills": [
        //         {
        //             "habilidade": "Habilidade com Espadas"
        //         },
        //         {
        //             "habilidade": "Comunicação"
        //         }
        //     ],
        //     "cargaHoraria": "Turno integral",
        //     "turno": "Manhã e noite",
        //     "modalidadeTrabalho": "Remoto",
        //     "areaInteresse": "Desenvolvimento de Software",
        //     "idiomas": [
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
        //     ]
        // } as unknown as CandidatoRequest;
        // this.cadastrarCandidato(mock4);

    //     const mock5 = {
    //         "nome": "Arya Stark",
    //         "dataNascimento": "1999-03-09",
    //         "email": "usernovo@hotmail.com",
    //         "telefoneCelular": "5198567369",
    //         "formacoes": [
    //             {
    //                 "nomeInstituicao": "Unisc",
    //                 "tipoGraduacao": "Tecnólogo",
    //                 "nomeCurso": "Processos Gerenciais",
    //                 "dataInicio": "01/05/2017",
    //                 "dataTermino": "01/12/2020"
    //             },
    //             {
    //                 "nomeInstituicao": "Univates",
    //                 "tipoGraduacao": "Bacharelado",
    //                 "nomeCurso": "Administração",
    //                 "dataInicio": "01/12/2020",
    //                 "dataTermino": "01/12/2025"
    //             }
    //         ],
    //         "linksRelevantes": [
    //             "material.angular.io/components/tooltip/overview",
    //             "wpdatatables.com/documentation/table-examples/products-table"
    //         ],
    //         "hardSkills": [
    //             {
    //                 "habilidade": "SEO",
    //                 "tempoExperiencia": 1
    //             },
    //             {
    //                 "habilidade": "Swift",
    //                 "tempoExperiencia": 5
    //             },
    //             {
    //                 "habilidade": "Jira",
    //                 "tempoExperiencia": 5
    //             },
    //             {
    //                 "habilidade": "React",
    //                 "tempoExperiencia": 1
    //             },
    //             {
    //                 "habilidade": "React Native",
    //                 "tempoExperiencia": 5
    //             },
    //             {
    //                 "habilidade": "Linux",
    //                 "tempoExperiencia": 5
    //             }
    //         ],
    //         "softSkills": [
    //             {
    //                 "habilidade": "Habilidade com Espadas"
    //             },
    //             {
    //                 "habilidade": "Paciência"
    //             }
    //         ],
    //         "cargaHoraria": "Meio turno",
    //         "turno": "Noite",
    //         "modalidadeTrabalho": "Remoto ou Híbrido",
    //         "cidadeResidencia": "Santa Cruz do Sul",
    //         "disponibilidadeRealocacao": true,
    //         "areaInteresse": "Inteligência Artificial",
    //         "idiomas": [
    //             {
    //                 "idioma": "Espanhol",
    //                 "nivelFluencia": "Intermediário"
    //             },
    //             {
    //                 "idioma": "Alemão",
    //                 "nivelFluencia": "Usuário independente"
    //             }
    //         ],
    //         "certificacoes": [
    //             {
    //                 "nome": "JAVA1",
    //                 "organizacaoEmissora": "Oracle",
    //                 "dataEmissao": "01/09/2022",
    //                 "urlCodigo": "ds89fs89f4u3jhr8989f9reuyfgy3489urtj34r"
    //             },
    //             {
    //                 "nome": "JAVA2",
    //                 "organizacaoEmissora": "Oracle",
    //                 "dataEmissao": "01/09/2022",
    //                 "urlCodigo": "dfs8u89dsvc89ds7fvhf349ewjhfr89348ufj89ewjhrf89jvc89eswrju89fvrcewu89fvrceu9re9fvjerjfvgre9fg345er8fg89fvgrej89frdesj8"
    //             }
    //         ],
    //         "experiencias": [
    //             {
    //                 "empresaOrganizacao": "UNISC",
    //                 "tituloCargo": "Professor",
    //                 "dataInicio": "01/09/2021",
    //                 "descricao": "descrição da atividade 1"
    //             },
    //             {
    //                 "empresaOrganizacao": "UNISC",
    //                 "tituloCargo": "Programador Jr",
    //                 "dataInicio": "01/12/2019"
    //             }
    //         ],
    //         "pontosFortes": "ponto forte 1, ponto forte 3",
    //         "pontosFracos": "ponto fraco 2, ponto fraco 5",
    //         "informacaoRelevante": "Minha carta de apresentação... Minha carta de apresentação... Minha carta de apresentação... Minha carta de apresentação... Minha carta de apresentação..."
    //     } as unknown as CandidatoRequest;
    //     this.cadastrarCandidato(mock5);

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
