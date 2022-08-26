import { TestBed } from '@angular/core/testing';

import { CandidatoServiceService } from './candidato-service.service';

describe('CandidatoServiceService', () => {
    let service: CandidatoServiceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CandidatoServiceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
