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

    cadastrar(candidato: CandidatoRequest): Observable<CandidatoResponse> {
        return this.http.post<CandidatoResponse>(this.baseUrl + 'candidato', candidato);
    }

    wakeUpHeroku(): Observable<boolean> {
        return this.http.get<boolean>(this.baseUrl + 'candidato/wakeup');
    }
}
