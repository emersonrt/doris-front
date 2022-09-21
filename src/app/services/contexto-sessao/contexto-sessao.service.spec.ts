import { TestBed } from '@angular/core/testing';

import { ContextoSessaoService } from './contexto-sessao.service';

describe('ContextoSessaoService', () => {
  let service: ContextoSessaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContextoSessaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
