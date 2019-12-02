import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LootregelnComponent } from './lootregeln.component';

describe('LootregelnComponent', () => {
  let component: LootregelnComponent;
  let fixture: ComponentFixture<LootregelnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LootregelnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LootregelnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
