import { CandidatoRequest } from '../../models/request/CandidatoRequest';
import { CandidatoResponse } from '../../models/response/CandidatoResponse';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CandidatoService {

    private url = 'http://localhost:8080/api/candidato';

    constructor(
        private http: HttpClient
    ) { }

    buscarTodos(): Observable<CandidatoResponse[]> {
        return this.http.get<CandidatoResponse[]>(this.url);
    }

    cadastrar(candidato: CandidatoRequest): Observable<CandidatoResponse> {
        console.log('cadastro', candidato);
        
        return this.http.post<CandidatoResponse>(this.url, candidato);
    }
}
