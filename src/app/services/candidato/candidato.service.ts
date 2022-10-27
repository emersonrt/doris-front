import { CandidatoResponse } from '../../models/response/CandidatoResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CandidatoRequest } from 'src/app/models/request/CandidatoRequest';
import { GeneralService } from '../general-service/general.service';

@Injectable({
    providedIn: 'root'
})
export class CandidatoService extends GeneralService {

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    buscarTodos(): Observable<CandidatoResponse[]> {
        return this.http.get<CandidatoResponse[]>(this.baseUrl + 'candidato');
    }

    cadastrar(candidato: CandidatoRequest): Observable<CandidatoResponse> {
        return this.http.post<CandidatoResponse>(this.baseUrl + 'candidato', candidato);
    }
}
