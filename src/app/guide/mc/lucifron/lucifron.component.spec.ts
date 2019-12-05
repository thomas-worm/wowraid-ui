import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LucifronComponent } from './lucifron.component';

describe('LucifronComponent', () => {
  let component: LucifronComponent;
  let fixture: ComponentFixture<LucifronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LucifronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LucifronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
