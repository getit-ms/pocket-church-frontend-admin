import { TestBed } from '@angular/core/testing';

import { VideoFacebookService } from './video-facebook.service';

describe('VideoFacebookService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideoFacebookService = TestBed.get(VideoFacebookService);
    expect(service).toBeTruthy();
  });
});
