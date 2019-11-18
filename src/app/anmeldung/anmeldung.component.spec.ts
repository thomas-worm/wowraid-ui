import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnmeldungComponent } from './anmeldung.component';

describe('AnmeldungComponent', () => {
  let component: AnmeldungComponent;
  let fixture: ComponentFixture<AnmeldungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnmeldungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnmeldungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
