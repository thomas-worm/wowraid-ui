import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpgpComponent } from './epgp.component';

describe('EpgpComponent', () => {
  let component: EpgpComponent;
  let fixture: ComponentFixture<EpgpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpgpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpgpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
