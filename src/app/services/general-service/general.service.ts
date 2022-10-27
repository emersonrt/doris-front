import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    protected baseUrl = 'http://localhost:8080/api/';

    constructor() { }
}
