import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShazzrahComponent } from './shazzrah.component';

describe('ShazzrahComponent', () => {
  let component: ShazzrahComponent;
  let fixture: ComponentFixture<ShazzrahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShazzrahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShazzrahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
