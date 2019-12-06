import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnyxiaComponent } from './onyxia.component';

describe('OnyxiaComponent', () => {
  let component: OnyxiaComponent;
  let fixture: ComponentFixture<OnyxiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnyxiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnyxiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
