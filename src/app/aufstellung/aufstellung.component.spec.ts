import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AufstellungComponent } from './aufstellung.component';

describe('AufstellungComponent', () => {
  let component: AufstellungComponent;
  let fixture: ComponentFixture<AufstellungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AufstellungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AufstellungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
