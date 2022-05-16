import { TestBed } from '@angular/core/testing';

import { TranslateVariablesService } from './translate-variables.service';

describe('TranslateVariablesService', () => {
  let service: TranslateVariablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateVariablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
