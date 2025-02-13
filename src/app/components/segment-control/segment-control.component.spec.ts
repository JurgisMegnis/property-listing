import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentControlComponent } from './segment-control.component';

describe('SegmentControlComponent', () => {
  let component: SegmentControlComponent;
  let fixture: ComponentFixture<SegmentControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegmentControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
