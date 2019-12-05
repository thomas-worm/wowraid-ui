import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SulfuronComponent } from './sulfuron.component';

describe('SulfuronComponent', () => {
  let component: SulfuronComponent;
  let fixture: ComponentFixture<SulfuronComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SulfuronComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SulfuronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
