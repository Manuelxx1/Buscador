import { TestBed } from '@angular/core/testing';

import { Busquedaservice } from './busquedaservice';

describe('Busquedaservice', () => {
  let service: Busquedaservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Busquedaservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
