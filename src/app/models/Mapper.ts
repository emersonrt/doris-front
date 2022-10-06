import { Formacao } from './request/Formacao';
import { SoftSkill } from './request/SoftSkill';
import { CandidatoRequest } from './request/CandidatoRequest';
import { Certificacao } from './request/Certificacao';
import { Experiencia } from './request/Experiencia';
import { Idioma } from './request/Idioma';
import { HardSkill } from './request/HardSkill';

export class Mapper {

    static fromDoris(dados: any, hardsSkills: HardSkill[], softSkills: SoftSkill[]): CandidatoRequest {
        return {
            nome: dados.Nome_do_candidato?.value,
            dataNascimento: dados.Data_de_nascimento?.value,
            email: dados.Email?.value,
            telefoneCelular: dados.Telefone_celular?.value,
            formacoes: this.fromFormacoes(dados.arrayFormacoes),
            linksRelevantes: this.fromLinks(dados.arrayLinksRelevantes),
            hardSkills: hardsSkills,
            softSkills: softSkills,
            cargaHoraria: dados.Carga_horaria,
            turno: dados.Turnos || dados.Turno,
            modalidadeTrabalho: dados.Modalidades_de_trabalho,
            cidadeResidencia: dados.Cidade_de_residencia,
            disponibilidadeRelocacao: true,
            areaInteresse: dados.Area_de_interesse_2 || dados.Area_de_interesse,
            idiomas: this.fromIdiomas(dados.arrayIdiomas),
            certificacoes: this.fromCertificacoes(dados.arrayCertificacoesFormacoes),
            experiencias: this.fromExperiencias(dados.arrayExperienciasProfissionais),
            pontosFortes: dados.Pontos_fortes,
            pontosFracos: dados.Pontos_fracos,
            informacaoRelevante: dados.Informacao_relevante
        } as CandidatoRequest;
    }

    private static fromFormacoes(arrayFormacoes: any[]): Formacao[] {
        let newArray: Formacao[] = [];
        arrayFormacoes.map(formacao => {
            newArray.push({
                nomeInstituicao: formacao.nome_instituicao,
                tipoGraduacao: formacao.tipo_graduacao,
                nomeCurso: formacao.nome_curso,
                dataInicio: formacao.data_inicio?.value,
                dataTermino: formacao.data_termino?.value
            });
        });
        return newArray;
    }

    private static fromLinks(arrayLinks: any[]): string[] {
        return arrayLinks.map(link => link.value);
    }

    private static fromIdiomas(arrayIdiomas: any[]): Idioma[] {
        let newArray: Idioma[] = [];
        arrayIdiomas.map(idioma => {
            newArray.push({
                idioma: idioma.idioma,
                nivelFluencia: idioma.nivelFluencia
            });
        });
        return newArray;
    }

    private static fromCertificacoes(arrayCertificacoes: any[]): Certificacao[] {
        let newArray: Certificacao[] = [];
        arrayCertificacoes.map(certificacao => {
            newArray.push({
                nome: certificacao.nome,
                organizacaoEmissora: certificacao.organizacao_emissora,
                dataEmissao: certificacao.data_emissao?.value,
                urlCodigo: certificacao.url_codigo
            });
        });
        return newArray;
    }

    private static fromExperiencias(arrayExperiencias: any[]): Experiencia[] {
        let newArray: Experiencia[] = [];
        arrayExperiencias.map(experiencia => {
            newArray.push({
                empresaOrganizacao: experiencia.empresa_organizacao,
                tituloCargo: experiencia.titulo_cargo,
                dataInicio: experiencia.data_inicio?.value,
                dataTermino: experiencia.data_termino?.value,
                descricao: experiencia.descricao
            });
        });
        return newArray;
    }

}
