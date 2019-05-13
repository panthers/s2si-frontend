import { TestBed } from '@angular/core/testing';

import { PropsRendererService } from './props-renderer.service';

describe('PropsRendererService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PropsRendererService = TestBed.get(PropsRendererService);
    expect(service).toBeTruthy();
  });
});
