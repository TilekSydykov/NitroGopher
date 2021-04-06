import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndPointsComponent } from './end-points.component';

describe('EndPointsComponent', () => {
  let component: EndPointsComponent;
  let fixture: ComponentFixture<EndPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndPointsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
