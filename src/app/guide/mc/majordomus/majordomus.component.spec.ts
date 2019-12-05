import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MajordomusComponent } from './majordomus.component';

describe('MajordomusComponent', () => {
  let component: MajordomusComponent;
  let fixture: ComponentFixture<MajordomusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajordomusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MajordomusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
