import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-info-retornar-iframe',
    templateUrl: './info-retornar-iframe.component.html',
    styleUrls: ['./info-retornar-iframe.component.scss']
})
export class InfoRetornarIframeComponent implements OnInit {

    @Input('alteracoes-liberadas') alteracoesLiberadas: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

}
