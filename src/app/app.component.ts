import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

    dataFromDorisEvent: Subscription = new Subscription();

    constructor() { }

    ngOnInit(): void {
        this.dataFromDorisEvent = fromEvent(window, 'sendDataToAngular').subscribe((result: any) => {
            console.log('variaveis_salvas no app:', result?.detail);
        });
    }

    ngOnDestroy() {
        this.dataFromDorisEvent.unsubscribe();
    }

}
