import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnHorizontalBarchartComponent } from './cn-horizontal-barchart.component';

describe('CnHorizontalBarchartComponent', () => {
  let component: CnHorizontalBarchartComponent;
  let fixture: ComponentFixture<CnHorizontalBarchartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnHorizontalBarchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnHorizontalBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
