import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnBarchartComponent } from './cn-barchart.component';

describe('CnBarchartComponent', () => {
  let component: CnBarchartComponent;
  let fixture: ComponentFixture<CnBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
