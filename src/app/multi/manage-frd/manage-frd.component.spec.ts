import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFrdComponent } from './manage-frd.component';

describe('ManageFrdComponent', () => {
  let component: ManageFrdComponent;
  let fixture: ComponentFixture<ManageFrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
