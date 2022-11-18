import { CandidatoService } from 'src/app/services/candidato/candidato.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private candidatoService: CandidatoService) { }

    ngOnInit(): void {
        this.candidatoService.wakeUpHeroku().subscribe({
            next: value => { },
            error: err => { }
        });
    }

}
