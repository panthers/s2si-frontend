import { TestBed } from '@angular/core/testing';

import { GfxService } from './gfx.service';

describe('GfxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GfxService = TestBed.get(GfxService);
    expect(service).toBeTruthy();
  });
});
