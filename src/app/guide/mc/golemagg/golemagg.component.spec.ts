import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GolemaggComponent } from './golemagg.component';

describe('GolemaggComponent', () => {
  let component: GolemaggComponent;
  let fixture: ComponentFixture<GolemaggComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GolemaggComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GolemaggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
