import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnToolbarComponent } from './cn-toolbar.component';

describe('CnToolbarComponent', () => {
  let component: CnToolbarComponent;
  let fixture: ComponentFixture<CnToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
