import {TestBed} from '@angular/core/testing';

import {UkCameraService} from './camera.service';

describe('UkCameraService', () => {
  let service: UkCameraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UkCameraService);
  });

  afterEach(() => {
    service.stopCamera();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default screen-based constraints', () => {
    const constraints = service.getScreenBasedConstraints('user');

    expect(constraints.video).toBeTruthy();
    expect(constraints.audio).toBe(false);
  });

  it('should set and get current stream', async () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.resolveTo(
      new MediaStream(),
    );

    const stream = await service.startCamera();

    expect(service.getCurrentStream()).toBe(stream);
  });

  it('should stop camera and clear current stream', () => {
    const fakeTrack = {
      stop: jasmine.createSpy('stop'),
    } as unknown as MediaStreamTrack;
    const fakeStream: MediaStream = {
      getTracks: () => [fakeTrack],
      getAudioTracks: () => [],
      getVideoTracks: () => [],
      getTrackById: () => null,
      addTrack: () => {},
      removeTrack: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: FALSE_HANDLER,
      clone: () => fakeStream,
      active: false,
      id: 'fake-stream-id',
      onaddtrack: null,
      onremovetrack: null,
    };

    service['currentStream'] = fakeStream;
    service.stopCamera();
    expect(fakeTrack.stop).toHaveBeenCalled();
    expect(service.getCurrentStream()).toBeNull();
  });

  it('should handle DOMException errors with messages', async () => {
    spyOn(navigator.mediaDevices, 'getUserMedia').and.callFake(async () => {
      const err = new DOMException('Access denied', 'NotAllowedError');

      return Promise.reject(err);
    });

    await expectAsync(service.startCamera()).toBeRejectedWithError(
      'دسترسی به دوربین توسط کاربر رد شد.',
    );
  });
});

function FALSE_HANDLER(_event: Event): boolean {
  return false;
}
