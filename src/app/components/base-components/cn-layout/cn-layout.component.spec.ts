import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnLayoutComponent } from './cn-layout.component';

describe('CnLayoutComponent', () => {
  let component: CnLayoutComponent;
  let fixture: ComponentFixture<CnLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
