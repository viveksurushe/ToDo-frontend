import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtodolistComponent } from './mtodolist.component';

describe('MtodolistComponent', () => {
  let component: MtodolistComponent;
  let fixture: ComponentFixture<MtodolistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtodolistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtodolistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
