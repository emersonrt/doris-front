import { HardSkill } from 'src/app/models/HardSkill';

export interface CandidatoPreRequest {
    nome: string;
    dataNascimento: string;
    telefoneCelular: string;
    email: string;
    hardSkills: HardSkill[];
    softSkills: string[];
}