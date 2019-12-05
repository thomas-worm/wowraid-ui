import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagmadarComponent } from './magmadar.component';

describe('MagmadarComponent', () => {
  let component: MagmadarComponent;
  let fixture: ComponentFixture<MagmadarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagmadarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagmadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
