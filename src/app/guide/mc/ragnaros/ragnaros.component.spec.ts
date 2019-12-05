import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RagnarosComponent } from './ragnaros.component';

describe('RagnarosComponent', () => {
  let component: RagnarosComponent;
  let fixture: ComponentFixture<RagnarosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RagnarosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RagnarosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
