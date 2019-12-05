import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GarrComponent } from './garr.component';

describe('GarrComponent', () => {
  let component: GarrComponent;
  let fixture: ComponentFixture<GarrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GarrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
