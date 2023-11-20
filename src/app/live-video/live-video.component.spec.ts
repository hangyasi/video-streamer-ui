import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveVideoComponent } from './live-video.component';

describe('LiveVideoComponent', () => {
  let component: LiveVideoComponent;
  let fixture: ComponentFixture<LiveVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LiveVideoComponent]
    });
    fixture = TestBed.createComponent(LiveVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
