import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeddonComponent } from './geddon.component';

describe('GeddonComponent', () => {
  let component: GeddonComponent;
  let fixture: ComponentFixture<GeddonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeddonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeddonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
