import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditnewComponent } from './editnew.component';

describe('EditnewComponent', () => {
  let component: EditnewComponent;
  let fixture: ComponentFixture<EditnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
