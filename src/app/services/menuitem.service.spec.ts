import { TestBed, inject } from '@angular/core/testing';

import { MenuitemService } from './menuitem.service';

describe('MenuitemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuitemService]
    });
  });

  it('should be created', inject([MenuitemService], (service: MenuitemService) => {
    expect(service).toBeTruthy();
  }));
});
