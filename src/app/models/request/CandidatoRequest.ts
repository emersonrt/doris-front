import { Experiencia } from './Experiencia';
import { Certificacao } from './Certificacao';
import { Idioma } from './Idioma';
import { Formacao } from './Formacao';
import { SoftSkill } from './SoftSkill';
import { HardSkill } from 'src/app/models/request/HardSkill';

export interface CandidatoRequest {
    nome: string;
    dataNascimento: string;
    telefoneCelular: string;
    email: string;
    hardSkills: HardSkill[];
    softSkills: SoftSkill[];
    formacoes: Formacao[];
    linksRelevantes: string[];
    cargaHoraria: string;
    turno: string;
    modalidadeTrabalho: string;
    cidadeResidencia: string;
    disponibilidadeRelocacao: boolean;
    areaInteresse: string;
    idiomas: Idioma[];
    certificacoes: Certificacao[];
    experiencias: Experiencia[];
    pontosFortes: string;
    pontosFracos: string;
    informacaoRelevante: string;
}