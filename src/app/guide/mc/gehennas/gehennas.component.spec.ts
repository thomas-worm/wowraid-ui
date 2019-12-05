import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GehennasComponent } from './gehennas.component';

describe('GehennasComponent', () => {
  let component: GehennasComponent;
  let fixture: ComponentFixture<GehennasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GehennasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GehennasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
