import { CandidatoRequest } from './models/request/CandidatoRequest';
import { CandidatoServiceService } from './services/candidato-service/candidato-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    dataFromDorisEvent: Subscription = new Subscription();

    constructor(private candidatoService: CandidatoServiceService) { }

    ngOnInit(): void {
        this.dataFromDorisEvent = fromEvent(window, 'sendDataToAngular').subscribe((result: any) => {
            console.log('variaveis_salvas no app:', result?.detail);
            this.candidatoService.cadastrar(
                {
                    nome: result?.detail.Nome_do_candidato,
                    email: result?.detail.Email.value
                } as CandidatoRequest
            ).subscribe({
                next: (response) => {
                    console.log('sucesso:', response);
                },
                error: (error) => {
                    console.log('error:', error);
                }
            });
        });

        this.candidatoService.buscarTodos().subscribe({
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
    }

}
