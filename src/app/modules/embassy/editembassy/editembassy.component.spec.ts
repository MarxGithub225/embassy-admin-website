import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditembassyComponent } from './editembassy.component';

describe('EditembassyComponent', () => {
  let component: EditembassyComponent;
  let fixture: ComponentFixture<EditembassyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditembassyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditembassyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
