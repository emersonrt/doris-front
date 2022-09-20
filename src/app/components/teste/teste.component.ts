import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';

declare var window: any;

@Component({
    selector: 'app-teste',
    templateUrl: './teste.component.html',
    styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {

    static hostSelector: '.mat-select';

    toppings = this._formBuilder.group({
        pepperoni: false,
        extracheese: false,
        mushroom: false,
    });

    constructor(private _formBuilder: FormBuilder) { }

    ngOnInit(): void {


        this.toppings.valueChanges.subscribe(
            {
                next: (response) => {
                    console.log('sucesso:', response);
                },
                error: (error) => {
                    console.log('error:', error);
                }
            }
        )

    }

}
