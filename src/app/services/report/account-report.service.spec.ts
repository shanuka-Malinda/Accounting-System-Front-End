import { TestBed } from '@angular/core/testing';

import { AccountReportService } from './account-report.service';

describe('AccountReportService', () => {
  let service: AccountReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
