import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnPageHeaderComponent } from './cn-page-header.component';

describe('CnPageHeaderComponent', () => {
  let component: CnPageHeaderComponent;
  let fixture: ComponentFixture<CnPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
