import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnDataTableComponent } from './cn-data-table.component';

describe('CnDataTableComponent', () => {
  let component: CnDataTableComponent;
  let fixture: ComponentFixture<CnDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
