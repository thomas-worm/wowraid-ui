import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecursiveComponent } from './decursive.component';

describe('DecursiveComponent', () => {
  let component: DecursiveComponent;
  let fixture: ComponentFixture<DecursiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecursiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecursiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
