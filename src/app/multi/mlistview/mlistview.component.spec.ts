import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlistviewComponent } from './mlistview.component';

describe('MlistviewComponent', () => {
  let component: MlistviewComponent;
  let fixture: ComponentFixture<MlistviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlistviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlistviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
